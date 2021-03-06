'use strict';
angular.module('angular-sharrre', []);
'use strict';

/**
 * @ngdoc directive
 * @name angular-sharrre.directive:sharrre
 * @description
 * # sharrre
 */
angular.module('angular-sharrre')
  .directive('sharrre', ['$log', function ($log) {
    return {
      restrict: 'EA',
      scope: {
        url: '=shareUrl',
        title: '=',
        description: '=shareDescription',
        text: '=shareText',
        short_url: '=shortUrl',

        media: '@',
        graph: '=graphObject'
      },
      controller: ['scope', 'element', function(scope, element) {

        
        var onceGraph = scope.$watch('graph', function(graph) {

            if (graph) {

                var object_url;
                if (graph.route) {
                    object_url = window.location.protocol + '//' + window.location.host + graph.route;
                }
                var short_url = graph.short_url;

                window.jQuery(element).sharrre({
                    url: object_url,
                    title: graph.title,
                    text: graph.text,
                    share: {
                        // googlePlus: true,
                        facebook: true,
                        twitter: true,
                        stumbleupon: true,
                        pinterest: true
                    },
                    // enableTracking: true,
                    enableHover: false,
                    template: '<div class="card card-block"><h3 class="total card-title">{total}</h3><div class="card-text social-icons"><a href="" class="facebook"><i class="icon-facebook"></i></a><a href="" class="google"><i class="icon-google"></i></a><a href="" class="twitter"><i class="icon-twitter"></i></a><a href="" class="stumbleupon"><i class="icon-stumbleupon"></i></a><a href="" class="pinterest"><i class="icon-pinterest"></i></a></div></div>',
                    buttons: {
                        // googlePlus: { size: 'tall', annotation:'bubble' },
                        facebook: {
                            layout: 'button_count',
                            url: object_url
                        },
                        twitter: {
                            count: 'horizontal',
                            url: short_url
                        },
                        stumbleupon: {
                            url: object_url
                        },
                        pinterest: {
                            media: scope.media,
                            description: graph.description ? graph.description : graph.text,
                            url: object_url
                        }
                    },
                    render: function(api, options){
                        $(api.element).on('click', '.twitter', function(evt) {
                            api.openPopup('twitter');
                            evt.preventDefault();
                        });
                        $(api.element).on('click', '.facebook', function(evt) {
                            api.openPopup('facebook');
                            evt.preventDefault();
                        });
                        $(api.element).on('click', '.googleplus', function(evt) {
                            api.openPopup('googlePlus');
                            evt.preventDefault();
                        });
                        $(api.element).on('click', '.stumbleupon', function(evt) {
                            api.openPopup('stumbleupon');
                            evt.preventDefault();
                        });

                        $(api.element).on('click', '.pinterest', function(evt) {
                            api.openPopup('pinterest');
                            evt.preventDefault();
                        });
                    }
                });

                // unbind
                onceGraph();

            }

        }, true);

      }]
    };
  }]);
