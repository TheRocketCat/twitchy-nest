'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">twitchy-nest documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-7404026e4d522fa36208c9b4443fb4a0"' : 'data-target="#xs-controllers-links-module-AppModule-7404026e4d522fa36208c9b4443fb4a0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7404026e4d522fa36208c9b4443fb4a0"' :
                                            'id="xs-controllers-links-module-AppModule-7404026e4d522fa36208c9b4443fb4a0"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7404026e4d522fa36208c9b4443fb4a0"' : 'data-target="#xs-injectables-links-module-AppModule-7404026e4d522fa36208c9b4443fb4a0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7404026e4d522fa36208c9b4443fb4a0"' :
                                        'id="xs-injectables-links-module-AppModule-7404026e4d522fa36208c9b4443fb4a0"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfoCommandModule.html" data-type="entity-link">InfoCommandModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-InfoCommandModule-3338866b18ba7e60d7bd729a383f0bc8"' : 'data-target="#xs-controllers-links-module-InfoCommandModule-3338866b18ba7e60d7bd729a383f0bc8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InfoCommandModule-3338866b18ba7e60d7bd729a383f0bc8"' :
                                            'id="xs-controllers-links-module-InfoCommandModule-3338866b18ba7e60d7bd729a383f0bc8"' }>
                                            <li class="link">
                                                <a href="controllers/InfoCommandController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfoCommandController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-InfoCommandModule-3338866b18ba7e60d7bd729a383f0bc8"' : 'data-target="#xs-injectables-links-module-InfoCommandModule-3338866b18ba7e60d7bd729a383f0bc8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InfoCommandModule-3338866b18ba7e60d7bd729a383f0bc8"' :
                                        'id="xs-injectables-links-module-InfoCommandModule-3338866b18ba7e60d7bd729a383f0bc8"' }>
                                        <li class="link">
                                            <a href="injectables/InfoCommandService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>InfoCommandService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CmdHandler.html" data-type="entity-link">CmdHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInfoCommandDto.html" data-type="entity-link">CreateInfoCommandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InfoCommand.html" data-type="entity-link">InfoCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/InfoCommand-1.html" data-type="entity-link">InfoCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReadInfoCommandDto.html" data-type="entity-link">ReadInfoCommandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TSC.html" data-type="entity-link">TSC</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwitchInfoCommand.html" data-type="entity-link">TwitchInfoCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwitchService.html" data-type="entity-link">TwitchService</a>
                            </li>
                            <li class="link">
                                <a href="classes/TwitchTest.html" data-type="entity-link">TwitchTest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedError.html" data-type="entity-link">UnauthorizedError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInfoCommandDto.html" data-type="entity-link">UpdateInfoCommandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/WrongAmountOfArgsError.html" data-type="entity-link">WrongAmountOfArgsError</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IClient.html" data-type="entity-link">IClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IToString.html" data-type="entity-link">IToString</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});