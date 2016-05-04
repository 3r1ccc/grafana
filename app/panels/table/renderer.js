/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["require","exports","lodash","app/core/utils/kbn","moment"],function(a,b,c,d,e){var f=function(){function a(a,b,c){this.panel=a,this.table=b,this.timezone=c,this.formaters=[],this.colorState={}}return a.prototype.getColorForValue=function(a,b){if(!b.thresholds)return null;for(var c=b.thresholds.length-1;c>=0;c--)if(a>=b.thresholds[c])return b.colors[c];return null},a.prototype.defaultCellFormater=function(a){return null===a||void 0===a?"":(c.isArray(a)&&(a=a.join(",&nbsp;")),a)},a.prototype.createColumnFormater=function(a){var b=this;if(!a)return this.defaultCellFormater;if("date"===a.type)return function(d){c.isArray(d)&&(d=d[0]);var f=e(d);return"utc"===b.timezone&&(f=f.utc()),f.format(a.dateFormat)};if("number"===a.type){var f=d.valueFormats[a.unit];return function(d){return null===d||void 0===d?"-":c.isString(d)?d:(a.colorMode&&(b.colorState[a.colorMode]=b.getColorForValue(d,a)),f(d,a.decimals,null))}}return this.defaultCellFormater},a.prototype.formatColumnValue=function(a,b){if(this.formaters[a])return this.formaters[a](b);for(var c=0;c<this.panel.styles.length;c++){var e=this.panel.styles[c],f=this.table.columns[a],g=d.stringToJsRegex(e.pattern);if(f.text.match(g))return this.formaters[a]=this.createColumnFormater(e),this.formaters[a](b)}return this.formaters[a]=this.defaultCellFormater,this.formaters[a](b)},a.prototype.renderCell=function(a,b,c){void 0===c&&(c=!1);var b=this.formatColumnValue(a,b),d="";this.colorState.cell?(d=' style="background-color:'+this.colorState.cell+';color: white"',this.colorState.cell=null):this.colorState.value&&(d=' style="color:'+this.colorState.value+'"',this.colorState.value=null);var e="";return c&&(e='<div class="table-panel-width-hack">'+this.table.columns[a].text+"</div>"),"<td"+d+">"+b+e+"</td>"},a.prototype.render=function(a){for(var b=this.panel.pageSize||100,c=a*b,d=Math.min(c+b,this.table.rows.length),e="",f=c;d>f;f++){for(var g=this.table.rows[f],h="",i="",j=0;j<this.table.columns.length;j++)h+=this.renderCell(j,g[j],f===c);this.colorState.row&&(i=' style="background-color:'+this.colorState.row+';color: white"',this.colorState.row=null),e+="<tr "+i+">"+h+"</tr>"}return e},a}();b.TableRenderer=f});