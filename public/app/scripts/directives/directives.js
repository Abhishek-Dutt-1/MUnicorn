'use strict';

var keywordSegmentsDirectives = angular.module('keywordSegmentsDirectives', []);

keywordSegmentsDirectives.directive('popoverForm', ['$compile', function($compile) {

return {

    restrict: 'A',
//    template: '<span ng-click="showPopoverForm()">{{label}}</span>',
//    templateUrl: 'app/scripts/directives/popoverForm.html',
//   template: '<span ng-transclude></span>',
    scope: {
        'showPopoverForm': '&xxx',
//        'popoverData': '@popoverData',
    },

//    transclude: true,
//    require: '?Step5Ctrl',
/*
    controller: function($scope, $element, $attrs, $location) {
        console.log($scope);

//        $scope.showPopoverForm1 = function(x) {
//           console.log(x);
//           $scope.showPopoverForm({someValue: x});
//        };

        $element.popover({
            trigger: 'click',
            html: 'true',
            content: $compile('<button ng-click="showPopoverForm({someValue:\''+$scope.popoverData+'\'})" type="button">{{popoverData}}</button>')($scope),
            
//            content: $compile('<span>' + attrs.popoverData + ' :: ' + scope.XXX + '</span>' + 
//                        '<input type=text />' +
//                        '<button ng-click="showPopoverForm('+scope.XXX+')" type="button">Submit</button>')(scope),
//                        '<button ng-click="showPopoverForm(' + attrs.popoverData + ')" type="button">Submit</button>')(scope),

//            placement: attrs.popoverPlacement
        });
    }
*/    

    link: function(scope, el, attrs)
    {
        scope.hidePopover = function() {
            console.log('HIDE');
            $(el).popover('hide');
        };

        $(el).popover({
            trigger: 'click',
            html: 'true',
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
            content: $compile('<div class="tagPopover"><span>' + attrs.popoverData + '</span><br />' + 
                            'Type: <input type="radio" ng-model="word1.type" value="stopword" />Stopword' +
                            '<input type="radio" ng-model="word1.type" value="negativeword" />Negative word<br />' +
                            'Segment: <input type=text ng-model="word1.segment" />' +
                            '<button type="button" ng-click="hidePopover()">Close</button>' + 
                            '<button ng-click="showPopoverForm({word: word1})" type="button">Ok</button></div>')(scope),
//                            '<button ng-click="showPopoverForm({word: \''+attrs.popoverData+'\'})" type="button">Submit</button></form>')(scope),
/*
            content: $compile('<span class="tagPopover">' + attrs.popoverData + ' :: ' + scope.popoverData + '</span>' + 
                        '<input type=text />' +
                        '<button ng-click="showPopoverForm({word: \''+attrs.popoverData+'\'})" type="button">Submit</button>')(scope),
*/
//                        '<button ng-click="showPopoverForm({word: \''+scope.popoverData+'\'})" type="button">Submit</button>')(scope),
//                        '<button ng-click="showPopoverForm(' + attrs.popoverData + ')" type="button">Submit</button>')(scope),
            placement: attrs.popoverPlacement,
//            container: el.parent()
//            container: $('#1tagCloud')
        });

    }
 
};

}]);
