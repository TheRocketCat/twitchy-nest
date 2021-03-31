# Mission
Develop a Twitch bot is to process commands via the twitch chat
and later also http request.

# Architecture Decisions
## Language
Javascript is the clear winner from my research. So i choose to develop in the superset Typescript
(compiles to JS), to increase the stability of the codebase.
When choosing programming language i asked these questions:
	- available libraries: are there any, how popular and what language does it use?
	- Previous language used by rally: do they have significant talent pool in one over another language?
	- Language problem fit: best language for the task?
	- Language Eco System: what language has the best libraries for the task

### Available Libraries
The two most prominent candidates tmi.js JS and twitchio Python.
In terms of github stars the JS library was over 3 times more popular than the Python library.
Documentation was roughly equal, altho neither was that good, but none was complex enough that
i ever had issues understanding.
Altho the JS library is mentioned by twitchs API docs, it is not an official library, however
that might add to it's longevity.
The JS library was also 3 years further in development.

This category clearly favors the JS library.
### Previous languages used by rally
In terms of languages used by rally before there seemed to be no preference for one over the other.

### Language problem fit
Both python and Javascript are fit to handle this task. Altho JS can be said to scale easier.
Again JS is prefered here, because this app will deal with large amounts of messages through
twitch chats and in general need high availability.

### Language Eco System
Both languages have great eco systems around libraries needed for this task. However as an
individual, when it comes to web development i am much more aware of the JS eco system and
hence this is again a win for JS, altho based more on a personal note.

## Base Architecture
The base of the architecture needed to be stable, easily serve two purposes
(http and twitch commands), secure, fast and scalabe, not to high learning curve,
long support.

The choices that crossed my mind were: nestJs, loopback 4, more minimalist solutions
(experss,fastify, restify), and many more.

NestJs and loopback were in a close race but ultimatly i choose NestJs.
Which is a opinionated framework on top of express/fastify, opinions which correlate
well to my initial ideas about the project architecture.

### NestJs
NestJs was choosen as a ground framework to build upon do to its
qualities of stability, popularity, speed, nice documentation, 
good base architecture to build on.

It is a framework mainly used for HTTP, but is currently used
as a base for customization and can later easily be extended
to add HTTP end point without having to redo any previous work.

### Negatives of NestJs
After som developing i discovered that creating good tests for certain parts of NestJs
was difficult. It took my several hours to find decent tutorials on how to properly
mock certain things. Once setup, it was easier and i have built and found several tools
to make it a lot easier.

## Architecute decisionts
As i developed this project, some things have come to mind, that needs to be adressed.

### Instancing
When we were talking about instancing two things came to mind. Both with it's own design 
implications that ultimatly comes down to: what is the purpose?

Here instancing is talking about the bot account, eg the program as a whole is a seperate
question about instance scaling.

Fundamentally i think the architecture question is:
Will there be one bot account joining many
channels, or multiple bots joining 1 channel each?

There is no difference in the amount of requests/connections we are allowed.

#### Solution 1: 1 bot to rule them all (1 account joining many channels)
In this example there will be one account, lets call it Rally. That is commanded to join
your channel. Due to the nature of twitch OAUTH, it seems this cant be done with more than
the ability to read and write messages.
Im still having some issues understanding exactly how the permissions work, especially the pub:sub
systems. It seems that given two permissions, chat:read, chat:edit, we can join any chat and
take commands. Anything else than that and this way becomes mute.

It will therefor have one single name across all channels it join. In order to join, each channel
owner needs to give explicit permission to at least speach, read via twitch OAUTH.

This will have higher security but at the same time less possibilities.

Refer to picture for a somewhat correct graphic.

#### Solution 2: One api to rule many bots (1 account joining one channel)
In this scenario, the bot will be using multiple accounts or rather look like
it by requiring 1 authentication per user. 
This will allow for higher permissions, and higher degrees of fine tuning of permissions
(in the case people want to opt out of certain features we offer).

Refer to picture for a somewhat correct graphic.

Im somewhat worried we might hit pubsub limits earlier with this architecture, because
im not certain how tmi.js library (the lib that handles Twitch), handles those kinds
of connections. The library is not meant to be used this way, so a somewhat "hacky"
solution will be needed here.

# Twitch Information
## Rate Limit
### API
Each client ID has a poin-refill rate of 800 points per minute and a bucket size of 800 points.
That implies every we can do 800 requests on 1 second, then wait 1 minute to get 800 points more.
It is essentially a mechanism for allowing bursts of the API, but never more than 800 requests per
minute, because we cant store more than 800 points in our "bucket".
Right now all endpoints are cost 1 point, but this might change in the future.

It is possible to have multiple client IDs, altho im not certain how twitch feels about us creating
more accounts here, altho they certainly doesnt do anything to prevent this.

Im not at all worried we will hit this limit tho, because these kinds of commands are not used often
(https://dev.twitch.tv/docs/api/reference), and even if we would, it would probably be easier
to implement a que system, and hence at the high of traffic slow these kinds of commands down a little.

### PubSub
" Clients can listen on up to 50 topics per connection. Trying to listen on more topics will result in an error message.
We recommend that a single client IP address establishes no more than 10 simultaneous connections.  " - twitch pubsub docs.
Depending on how the second statment about connections per IP is to be taken, we might run into issues, with the second
instancing solution 2. This is very hard to know because honestly twitch docs are kinda shitty on this topic, and tmi.js
is even shittier on this topic.
Right now tho, i havnt found any evidence to suggest tmi.js is using pubsub.

### IRC
the irc is what tmi.js uses to chat. Here the limits are 20 msgs / 30 seconds for normal users, or 100 msgs / 30 seconds for
moderators and operators.
Failure to adhere means a 30 minute ban.
This is the feature used the most, eg replying through messages,

## Security
### Authentication
https://dev.twitch.tv/docs/authentication
### OAUTH
Twitch has 3 tokens. ID Tokens, User access tokens, App access tokens.
We need user tokens to be able to do things on twitch. These are essentially passwords and
must be guarded.

### Security Threats
#### Storing OAUTH
##### Problem
We would ideally store OAUTHS, to avoid needing users to re authenticate every time the bot starts,
accidentally shuts down, needs maintanance etc.

This raises concerns because if we get hacked then these OAUTHS can be used to damage them.

##### Solution
Good news are that the OAUTHs can be scoped, to only allow certain things be done. Nevertheless
it can end up being unpleasent, and in cituations were higher security permissions have been given
to us, we can definitely end up in the shitter.

Right now tho, we dont use any special kinds of permissions, only read and write messages, which
at worst can lead to some bot trolls.
There is one permission that is of interest to us to, altho not strictly needed. This is the moderator
permission, which would allow things like banning, deleting messages, followers only mode, adding more
moderators and needless to say some other unpleasent things. This is only really of intrest to us
because it raises the IRC limit from 20 to 100msgs per seconds. Altho a que can be implemented instead
and reduce the risk at a slower responce time.

Naturally we encrypt the database where we store them. This still leaves room for snooping attacks on the
running bot. 
The best solution then as i see it is to implement a "request token and clean up strategy". Twitch
allows for tokens to request tokens, which then means we could store these tokens encrypted, then 
generate oauth tokens as we need them and then delete them later. Which means that we reduce the
window of vurneability to when the bot is actually using the OAUTH.

#### Channel Joining DOS
##### Problem
If not properly managed who is allowed to "invite" the bot to their channel
it could be made to join millions of channels until it cant handle any or
twitch bans or limits us.
To mitigate this a strong verification that the channels it join is
actually belonging to Rally Creators is needed.
##### Potential Solution
Some way for the bot to verify that the user inviting the bot is a rally
creator removes this risk, as long as they are limited to few accounts.

Also Twitch OAUTH allows us to verify that the channel it joins is at least
belonging to the person inviting it. Mitigating the risk to equal the
amount of accounts that person have controll of.
Altho still a real possibility, there are services out there who complete
captchas, and hence creating accounts by a bot can be automated.

#### Security Twitch Configuration
##### Problem
It's not certain to me how to securely verify a user executing a command in
the twitch chat is actually authorized, (the user they say they are). 
The main reason being that twitch abviosly hasnt intended for people to 
build high security applications on top of the chat.
##### Solution
As of right now i only know of one way to verify from the twitch chat,
which is to compare the command executers name to that of the channel it was
executed in. However i dont know how easily this may be spoofed. And
thus it might be best that all kinds of sensetive configuration of the
bot has to  be done inside "high security zones", most likely our web
portal. While less secure commands can be configured via this simpler 
form of authentication.

# Agenda & General info
## Questions & Concerns
I am not entierly certain if the get balance information command is setup correctly. I have mocked it
and such, but seeing as i dont have any rally ids i cant test it e2e entierly.

What instancing solutions should we go for? I suggest nr 2. Its the only way to implement advanced
features later that require more advanced permissionds.

Do we care about implementing custom command symbols?

Do we have any good test user for this? The project does have quite good test suit, but its very hard
to predict what issues a user might run into.

Whats the status on OAUTH, and how does this relate to this project?

Right now the way to get OAUTH from users are by them going to a link and logging into their twitch account.
Right now since there is no frontend for this, this might be very strange or alert negative emotions for
end users due to it not looking professionall. So the question is how do we adress that? Hands on aproach,
wait for frontend, notify people etc comes to mind.

What are the thoughts about hosting this app? Atm i havnt made any host assumptions, so its a flexible.

## Suggestions & Info
I suggest you start checking my work out, seeing if it is all as you want, so we can begin to tick
of user stories and modify the ones that doesnt seem correct with the product owner.
https://github.com/TheRocketCat/twitchy/projects/4
There are a lot of small improvments i have found as i worked on this. But the main goal are those
in the milestone MVP. Of which most are done that can be done. Things unable to be finish are marked
as "hindered", and the ones that require thought by the team are marked "question", all questions are
addressed here.

Right now due to the fact that im a perfectionist, i have built this project twice. So the actual
code base, new and imporved is here:
https://github.com/TheRocketCat/twitchy-nest

and the old one is here:https://github.com/TheRocketCat/twitchy


I highly suggest we go with the new one, abviously. I decided to redo it all when i discovered i had
some extra time on my hands. Hence im now somewhat late. But holy fuck if im not proud, i really like
how it turned out. Yall getting alot of bang for the buck.
