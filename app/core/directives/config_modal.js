/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["lodash","jquery","../core_module"],function(a,b,c){"use strict";c.directive("configModal",["$modal","$q","$timeout",function(a,c,d){return{restrict:"A",link:function(e,f,g){var h=g.configModal,i="#"+h.replace(".html","").replace(/[\/|\.|:]/g,"-")+"-"+e.$id;f.bind("click",function(){if(b(i).length)return f.attr("data-target",i).attr("data-toggle","modal"),void e.$apply(function(){e.$broadcast("modal-opened")});var g=a({template:h,persist:!1,show:!1,scope:e.$new(),keyboard:!1});c.when(g).then(function(a){f.attr("data-target",i).attr("data-toggle","modal"),d(function(){a.data("modal").isShown||a.modal("show")},50)}),e.$apply()})}}}])});