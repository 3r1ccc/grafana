/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","jquery","moment","lodash","app/core/utils/kbn","./graph.tooltip","jquery.flot","jquery.flot.events","jquery.flot.selection","jquery.flot.time","jquery.flot.stack","jquery.flot.stackpercent","jquery.flot.fillbelow","jquery.flot.crosshair"],function(a,b,c,d,e,f){"use strict";var g=a.module("grafana.directives");g.directive("grafanaGraph",["$rootScope","timeSrv",function(a,g){return{restrict:"A",template:"<div> </div>",link:function(h,i){function j(a){if(!h.panel.legend.show||h.panel.legend.rightSide)return 0;if(h.panel.legend.alignAsTable){var b=30+25*z.length;return Math.min(b,Math.floor(a/2))}return 26}function k(){try{return C=h.height||h.panel.height||h.row.height,d.isString(C)&&(C=parseInt(C.replace("px",""),10)),C-=5,C-=h.panel.title?24:9,C-=j(C),i.css("height",C+"px"),!0}catch(a){return!1}}function l(){return z?a.fullscreen&&!h.fullscreen?!0:k()?d.isString(z)?(y(z),!0):0===i.width()?!0:void 0:!0:!0}function m(a){for(var c=a.getYAxes(),f=0;f<z.length;f++){var g=z[f],j=c[g.yaxis-1],k=e.valueFormats[h.panel.y_formats[g.yaxis-1]];if(d.isNumber(h.panel.decimals))g.updateLegendValues(k,h.panel.decimals,null);else{var l=(j.tickDecimals||-1)+1;g.updateLegendValues(k,l,j.scaledDecimals+2)}h.$$phase||h.$digest()}if(h.panel.leftYAxisLabel){var m=b("<div class='axisLabel left-yaxis-label'></div>").text(h.panel.leftYAxisLabel).appendTo(i);m.css("margin-top",m.width()/2)}if(h.panel.rightYAxisLabel){var n=b("<div class='axisLabel right-yaxis-label'></div>").text(h.panel.rightYAxisLabel).appendTo(i);n.css("margin-top",n.width()/2)}}function n(a,b){h.panel.leftYAxisLabel&&(b.left=20),h.panel.rightYAxisLabel&&(b.right=20)}function o(){function a(a){try{b.plot(i,B,f)}catch(c){console.log("flotcharts error",c)}a&&h.panelRenderingComplete()}if(!l()){for(var c=h.panel,e=c.stack?!0:null,f={hooks:{draw:[m],processOffset:[n]},legend:{show:!1},series:{stackpercent:c.stack?c.percentage:!1,stack:c.percentage?null:e,lines:{show:c.lines,zero:!1,fill:p(c.fill),lineWidth:c.linewidth,steps:c.steppedLine},bars:{show:c.bars,fill:1,barWidth:1,zero:!1,lineWidth:0},points:{show:c.points,fill:1,fillColor:!1,radius:c.points?c.pointradius:2},shadowSize:1},yaxes:[],xaxis:{},grid:{minBorderMargin:0,markings:[],backgroundColor:null,borderWidth:0,hoverable:!0,color:"#c8c8c8",margin:{left:0,right:0}},selection:{mode:"x",color:"#666"},crosshair:{mode:c.tooltip.shared||D.sharedCrosshair?"x":null}},g=0;g<z.length;g++){var j=z[g];j.applySeriesOverrides(c.seriesOverrides),j.data=j.getFlotPairs(j.nullPointMode||c.nullPointMode,c.y_formats),h.hiddenSeries[j.alias]&&(j.data=[],j.stack=!1)}z.length&&z[0].stats.timeStep&&(f.series.bars.barWidth=z[0].stats.timeStep/1.5),r(f),s(f,c),t(f),u(z,f),B=d.sortBy(z,function(a){return a.zindex}),q(c)?(a(!1),setTimeout(function(){a(!0)},50),E=c.legend.rightSide):a(!0)}}function p(a){return 0===a?.001:a/10}function q(a){return a.legend.rightSide?!0:null!==E&&a.legend.rightSide!==E?!0:void 0}function r(a){var b=i.width()/100,c=d.isUndefined(h.range.from)?null:h.range.from.valueOf(),e=d.isUndefined(h.range.to)?null:h.range.to.valueOf();a.xaxis={timezone:D.timezone,show:h.panel["x-axis"],mode:"time",min:c,max:e,label:"Datetime",ticks:b,timeformat:x(h.interval,b,c,e)}}function s(a,b){if(d.isNumber(b.grid.threshold1)){var c=b.grid.thresholdLine?b.grid.threshold1:b.grid.threshold2||null;if(a.grid.markings.push({yaxis:{from:b.grid.threshold1,to:c},color:b.grid.threshold1Color}),d.isNumber(b.grid.threshold2)){var e;e=b.grid.thresholdLine?b.grid.threshold2:b.grid.threshold1>b.grid.threshold2?-(1/0):+(1/0),a.grid.markings.push({yaxis:{from:b.grid.threshold2,to:e},color:b.grid.threshold2Color})}}}function t(a){if(A&&0!==A.length){var b={};d.each(A,function(c){b[c.annotation.name]||(b[c.annotation.name]={level:d.keys(b).length+1,icon:{icon:"fa fa-chevron-down",size:c.annotation.iconSize,color:c.annotation.iconColor}}),c.annotation.showLine&&a.grid.markings.push({color:c.annotation.lineColor,lineWidth:1,xaxis:{from:c.min,to:c.max}})}),a.events={levels:d.keys(b).length+1,data:A,types:b}}}function u(a,b){var c={position:"left",show:h.panel["y-axis"],min:h.panel.grid.leftMin,index:1,logBase:h.panel.grid.leftLogBase||1,max:h.panel.percentage&&h.panel.stack?100:h.panel.grid.leftMax};if(b.yaxes.push(c),d.findWhere(a,{yaxis:2})){var e=d.clone(c);e.index=2,e.logBase=h.panel.grid.rightLogBase||1,e.position="right",e.min=h.panel.grid.rightMin,e.max=h.panel.percentage&&h.panel.stack?100:h.panel.grid.rightMax,b.yaxes.push(e),v(b.yaxes[1],a),w(b.yaxes[1],h.panel.y_formats[1])}v(b.yaxes[0],a),w(b.yaxes[0],h.panel.y_formats[0])}function v(a,b){if(1!==a.logBase){var c,d,e=a.max;if(null===e){for(d=0;d<b.length;d++)c=b[d],c.yaxis===a.index&&e<c.stats.max&&(e=c.stats.max);void 0===e&&(e=Number.MAX_VALUE)}a.min=null!==a.min?a.min:0,a.ticks=[0,1];for(var f=1;;)if(f*=a.logBase,a.ticks.push(f),f>e)break;10===a.logBase?(a.transform=function(a){return Math.log(a+.1)},a.inverseTransform=function(a){return Math.pow(10,a)}):(a.transform=function(b){return Math.log(b+.1)/Math.log(a.logBase)},a.inverseTransform=function(b){return Math.pow(a.logBase,b)})}}function w(a,b){a.tickFormatter=function(a,c){return e.valueFormats[b](a,c.tickDecimals,c.scaledDecimals)}}function x(a,b,c,d){if(c&&d&&b){var e=(d-c)/b/1e3;return 45>=e?"%H:%M:%S":7200>=e?"%H:%M":8e4>=e?"%m/%d %H:%M":2419200>=e?"%m/%d":"%Y-%m"}return"%H:%M"}function y(a){switch(a+="&width="+i.width(),a+="&height="+i.css("height").replace("px",""),a+="&bgcolor=1f1f1f",a+="&fgcolor=BBBFC2",a+=h.panel.stack?"&areaMode=stacked":"",a+=0!==h.panel.fill?"&areaAlpha="+(h.panel.fill/10).toFixed(1):"",a+=0!==h.panel.linewidth?"&lineWidth="+h.panel.linewidth:"",a+=h.panel.legend.show?"&hideLegend=false":"&hideLegend=true",a+=null!==h.panel.grid.leftMin?"&yMin="+h.panel.grid.leftMin:"",a+=null!==h.panel.grid.leftMax?"&yMax="+h.panel.grid.leftMax:"",a+=null!==h.panel.grid.rightMin?"&yMin="+h.panel.grid.rightMin:"",a+=null!==h.panel.grid.rightMax?"&yMax="+h.panel.grid.rightMax:"",a+=h.panel["x-axis"]?"":"&hideAxes=true",a+=h.panel["y-axis"]?"":"&hideYAxis=true",h.panel.y_formats[0]){case"bytes":a+="&yUnitSystem=binary";break;case"bits":a+="&yUnitSystem=binary";break;case"bps":a+="&yUnitSystem=si";break;case"pps":a+="&yUnitSystem=si";break;case"Bps":a+="&yUnitSystem=si";break;case"short":a+="&yUnitSystem=si";break;case"joule":a+="&yUnitSystem=si";break;case"watt":a+="&yUnitSystem=si";break;case"ev":a+="&yUnitSystem=si";break;case"none":a+="&yUnitSystem=none"}switch(h.panel.nullPointMode){case"connected":a+="&lineMode=connected";break;case"null":break;case"null as zero":a+="&drawNullAsZero=true"}a+=h.panel.steppedLine?"&lineMode=staircase":"",i.html('<img src="'+a+'"></img>')}var z,A,B,C,D=h.dashboard,E=null;h.crosshairEmiter=!1,h.onAppEvent("setCrosshair",function(a,b){if(b.scope!==h&&D.sharedCrosshair){var c=i.data().plot;c&&c.setCrosshair({x:b.pos.x,y:b.pos.y})}}),h.onAppEvent("clearCrosshair",function(){var a=i.data().plot;a&&a.clearCrosshair()}),h.$on("render",function(a,b){return(z=b||z)?(A=z.annotations||A,void o()):void h.get_data()}),new f(i,D,h,function(){return B}),i.bind("plotselected",function(a,b){h.$apply(function(){g.setTime({from:c.utc(b.xaxis.from),to:c.utc(b.xaxis.to)})})})}}}])});