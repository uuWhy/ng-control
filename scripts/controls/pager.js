angular.module("sn.controls").directive('snPager', function () {
    return {
        restrict: 'E',
        scope: {},
        controller: function ($scope, pagerConfig) {
            $scope.pages = [];

            $scope.currentPage = 0;
            $scope.totalPages = 1;
            $scope.totalItems = 0;
            $scope.pageOffset = 0;

            $scope.$watch("totalItems", function () {
                $scope.reset();

                if ($scope.pages[$scope.currentPage - $scope.pageOffset]) {
                    $scope.pages[$scope.currentPage - $scope.pageOffset].active = true;
                }
            });

            $scope.reset = function () {
                if ($scope.totalItems % $scope.itemsPerPage == 0) {
                    $scope.totalPages = $scope.totalItems / $scope.itemsPerPage;
                } else {
                    $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                }

                if ($scope.totalPages == 0) {
                    $scope.totalPages = 1;
                }

                resetPageList();
            };

            function getOffset(page) {
                var offset = Math.min(page, $scope.totalPages - $scope.listSize);
                if (offset < 0) {
                    offset = 0;
                }

                return offset;
            }

            function tryResetPageList(page) {
                var offset = getOffset(page);
                if (offset != $scope.pageOffset) {
                    $scope.pageOffset = offset;
                    resetPageList();
                }
            }

            function resetPageList() {
                $scope.pages = [];

                var last = Math.min($scope.pageOffset + $scope.listSize, $scope.totalPages);
                for (var i = $scope.pageOffset; i < last; i++) {
                    $scope.pages.push({
                        text: i,
                        pageIndex: i,
                        active: false
                    });
                }
            };

            $scope.getText = function (key) {
                return pagerConfig.text[key];
            };

            $scope.isFirst = function () {
                return $scope.currentPage <= 0;
            };

            $scope.isLast = function () {
                return $scope.currentPage >= $scope.totalPages - 1;
            };

            $scope.selectPage = function (value) {
                if ((value >= $scope.totalPages) || (value < 0)) {
                    return;
                }

                if ($scope.pages[$scope.currentPage - $scope.pageOffset]) {
                    $scope.pages[$scope.currentPage - $scope.pageOffset].active = false;
                }

                tryResetPageList(value);
                $scope.currentPage = value;

                $scope.pages[$scope.currentPage - $scope.pageOffset].active = true;

                $scope.$emit("sn.controls.pager:pageIndexChanged", $scope.pages[$scope.currentPage - $scope.pageOffset]);
            };

            $scope.first = function () {
                if (this.isFirst()) {
                    return;
                }
                this.selectPage(0);
            };

            $scope.last = function () {
                if (this.isLast()) {
                    return;
                }
                this.selectPage(this.totalPages - 1);
            };

            $scope.previous = function () {
                if (this.isFirst()) {
                    return;
                }
                this.selectPage(this.currentPage - 1);
            };

            $scope.next = function () {
                if (this.isLast()) {
                    return;
                }
                this.selectPage(this.currentPage + 1);
            };
        },
        link: function (scope, element, attrs) {
            scope.itemsPerPage = (attrs.itemsperpage - 0) || 10;
            scope.listSize = (attrs.listsize - 0) || 10;

            attrs.$observe("totalitems", function (value) {
                scope.totalItems = value;
            });
        },
        templateUrl: 'templates/pager/pager.html'
    };
}).constant('pagerConfig', {
    itemsPerPage: 10,
    text: {
        first: '首页',
        previous: '上一页',
        next: '下一页',
        last: '末页'
    }
});