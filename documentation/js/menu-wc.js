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
                    <a href="index.html" data-type="index-link">backend_posjumbotea documentation</a>
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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-1199f73d7339b38eb2f071465e4fdd70cf9d6b5e347608ea95454104a6ff5333315b1fc02065e94be280f3fd55e6001b3d2ab68ae9b428fee8a2c98a4bb96367"' : 'data-bs-target="#xs-controllers-links-module-AppModule-1199f73d7339b38eb2f071465e4fdd70cf9d6b5e347608ea95454104a6ff5333315b1fc02065e94be280f3fd55e6001b3d2ab68ae9b428fee8a2c98a4bb96367"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-1199f73d7339b38eb2f071465e4fdd70cf9d6b5e347608ea95454104a6ff5333315b1fc02065e94be280f3fd55e6001b3d2ab68ae9b428fee8a2c98a4bb96367"' :
                                            'id="xs-controllers-links-module-AppModule-1199f73d7339b38eb2f071465e4fdd70cf9d6b5e347608ea95454104a6ff5333315b1fc02065e94be280f3fd55e6001b3d2ab68ae9b428fee8a2c98a4bb96367"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-1199f73d7339b38eb2f071465e4fdd70cf9d6b5e347608ea95454104a6ff5333315b1fc02065e94be280f3fd55e6001b3d2ab68ae9b428fee8a2c98a4bb96367"' : 'data-bs-target="#xs-injectables-links-module-AppModule-1199f73d7339b38eb2f071465e4fdd70cf9d6b5e347608ea95454104a6ff5333315b1fc02065e94be280f3fd55e6001b3d2ab68ae9b428fee8a2c98a4bb96367"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1199f73d7339b38eb2f071465e4fdd70cf9d6b5e347608ea95454104a6ff5333315b1fc02065e94be280f3fd55e6001b3d2ab68ae9b428fee8a2c98a4bb96367"' :
                                        'id="xs-injectables-links-module-AppModule-1199f73d7339b38eb2f071465e4fdd70cf9d6b5e347608ea95454104a6ff5333315b1fc02065e94be280f3fd55e6001b3d2ab68ae9b428fee8a2c98a4bb96367"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b0a5125d10567f506bfa97a9b33f48d8998c1da5e918f2da8c3a9b5ffc094776eb14936af3579101bca9e53d190477b72b7e342b0c6ec4aa5636813b38ffdec5"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b0a5125d10567f506bfa97a9b33f48d8998c1da5e918f2da8c3a9b5ffc094776eb14936af3579101bca9e53d190477b72b7e342b0c6ec4aa5636813b38ffdec5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b0a5125d10567f506bfa97a9b33f48d8998c1da5e918f2da8c3a9b5ffc094776eb14936af3579101bca9e53d190477b72b7e342b0c6ec4aa5636813b38ffdec5"' :
                                            'id="xs-controllers-links-module-AuthModule-b0a5125d10567f506bfa97a9b33f48d8998c1da5e918f2da8c3a9b5ffc094776eb14936af3579101bca9e53d190477b72b7e342b0c6ec4aa5636813b38ffdec5"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b0a5125d10567f506bfa97a9b33f48d8998c1da5e918f2da8c3a9b5ffc094776eb14936af3579101bca9e53d190477b72b7e342b0c6ec4aa5636813b38ffdec5"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b0a5125d10567f506bfa97a9b33f48d8998c1da5e918f2da8c3a9b5ffc094776eb14936af3579101bca9e53d190477b72b7e342b0c6ec4aa5636813b38ffdec5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b0a5125d10567f506bfa97a9b33f48d8998c1da5e918f2da8c3a9b5ffc094776eb14936af3579101bca9e53d190477b72b7e342b0c6ec4aa5636813b38ffdec5"' :
                                        'id="xs-injectables-links-module-AuthModule-b0a5125d10567f506bfa97a9b33f48d8998c1da5e918f2da8c3a9b5ffc094776eb14936af3579101bca9e53d190477b72b7e342b0c6ec4aa5636813b38ffdec5"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrderModule-d3b216110db7da7b51b9fc5c5b5ae7bf767bbe33ca0dc77bfc5bf9d8b7da4ba84087e516954567f702c248c5b2d4252e769d570735fe62b34b9b314d43106c4a"' : 'data-bs-target="#xs-controllers-links-module-OrderModule-d3b216110db7da7b51b9fc5c5b5ae7bf767bbe33ca0dc77bfc5bf9d8b7da4ba84087e516954567f702c248c5b2d4252e769d570735fe62b34b9b314d43106c4a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-d3b216110db7da7b51b9fc5c5b5ae7bf767bbe33ca0dc77bfc5bf9d8b7da4ba84087e516954567f702c248c5b2d4252e769d570735fe62b34b9b314d43106c4a"' :
                                            'id="xs-controllers-links-module-OrderModule-d3b216110db7da7b51b9fc5c5b5ae7bf767bbe33ca0dc77bfc5bf9d8b7da4ba84087e516954567f702c248c5b2d4252e769d570735fe62b34b9b314d43106c4a"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrderModule-d3b216110db7da7b51b9fc5c5b5ae7bf767bbe33ca0dc77bfc5bf9d8b7da4ba84087e516954567f702c248c5b2d4252e769d570735fe62b34b9b314d43106c4a"' : 'data-bs-target="#xs-injectables-links-module-OrderModule-d3b216110db7da7b51b9fc5c5b5ae7bf767bbe33ca0dc77bfc5bf9d8b7da4ba84087e516954567f702c248c5b2d4252e769d570735fe62b34b9b314d43106c4a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-d3b216110db7da7b51b9fc5c5b5ae7bf767bbe33ca0dc77bfc5bf9d8b7da4ba84087e516954567f702c248c5b2d4252e769d570735fe62b34b9b314d43106c4a"' :
                                        'id="xs-injectables-links-module-OrderModule-d3b216110db7da7b51b9fc5c5b5ae7bf767bbe33ca0dc77bfc5bf9d8b7da4ba84087e516954567f702c248c5b2d4252e769d570735fe62b34b9b314d43106c4a"' }>
                                        <li class="link">
                                            <a href="injectables/OrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-b26166f92cfad849b117ab7a0966ae4955fe54c993ba0e2bce18e8660576c78b61e87dfe1d30b6407977f484c8c6f333193368bb31119c8d03443fbbe7bbe7ad"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-b26166f92cfad849b117ab7a0966ae4955fe54c993ba0e2bce18e8660576c78b61e87dfe1d30b6407977f484c8c6f333193368bb31119c8d03443fbbe7bbe7ad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-b26166f92cfad849b117ab7a0966ae4955fe54c993ba0e2bce18e8660576c78b61e87dfe1d30b6407977f484c8c6f333193368bb31119c8d03443fbbe7bbe7ad"' :
                                        'id="xs-injectables-links-module-PrismaModule-b26166f92cfad849b117ab7a0966ae4955fe54c993ba0e2bce18e8660576c78b61e87dfe1d30b6407977f484c8c6f333193368bb31119c8d03443fbbe7bbe7ad"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-227258f78e2ade148dbf3f8611d0853ffb1b9dc3d5d1860a0c45182490d1b009f5e3c65691203e1601af61a2bb5cc5197448593421dc39aba7fe793aebcb00f0"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-227258f78e2ade148dbf3f8611d0853ffb1b9dc3d5d1860a0c45182490d1b009f5e3c65691203e1601af61a2bb5cc5197448593421dc39aba7fe793aebcb00f0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-227258f78e2ade148dbf3f8611d0853ffb1b9dc3d5d1860a0c45182490d1b009f5e3c65691203e1601af61a2bb5cc5197448593421dc39aba7fe793aebcb00f0"' :
                                            'id="xs-controllers-links-module-ProductModule-227258f78e2ade148dbf3f8611d0853ffb1b9dc3d5d1860a0c45182490d1b009f5e3c65691203e1601af61a2bb5cc5197448593421dc39aba7fe793aebcb00f0"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-227258f78e2ade148dbf3f8611d0853ffb1b9dc3d5d1860a0c45182490d1b009f5e3c65691203e1601af61a2bb5cc5197448593421dc39aba7fe793aebcb00f0"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-227258f78e2ade148dbf3f8611d0853ffb1b9dc3d5d1860a0c45182490d1b009f5e3c65691203e1601af61a2bb5cc5197448593421dc39aba7fe793aebcb00f0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-227258f78e2ade148dbf3f8611d0853ffb1b9dc3d5d1860a0c45182490d1b009f5e3c65691203e1601af61a2bb5cc5197448593421dc39aba7fe793aebcb00f0"' :
                                        'id="xs-injectables-links-module-ProductModule-227258f78e2ade148dbf3f8611d0853ffb1b9dc3d5d1860a0c45182490d1b009f5e3c65691203e1601af61a2bb5cc5197448593421dc39aba7fe793aebcb00f0"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateOrderDto.html" data-type="entity-link" >CreateOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrderItemDto.html" data-type="entity-link" >CreateOrderItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});