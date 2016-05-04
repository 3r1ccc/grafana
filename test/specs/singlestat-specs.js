/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["./helpers","app/features/panel/panel_srv","app/features/panel/panel_helper","app/panels/singlestat/module"],function(a){"use strict";describe("SingleStatCtrl",function(){function b(a,b){describe(a,function(){c.setup=function(a){beforeEach(module("grafana.services")),beforeEach(module("grafana.panels.singlestat")),beforeEach(c.providePhase()),beforeEach(c.createControllerPhase("SingleStatCtrl")),beforeEach(function(){a(),c.datasource.query=sinon.stub().returns(c.$q.when({data:[{target:"test.cpu1",datapoints:c.datapoints}]})),c.scope.refreshData(c.datasource),c.scope.$digest(),c.data=c.scope.data})},b(c)})}var c=new a.ControllerTestContext;b("with defaults",function(a){a.setup(function(){a.datapoints=[[10,1],[20,2]]}),it("Should use series avg as default main value",function(){expect(a.data.value).to.be(15),expect(a.data.valueRounded).to.be(15)}),it("should set formated falue",function(){expect(a.data.valueFormated).to.be("15")})}),b("MainValue should use same number for decimals as displayed when checking thresholds",function(a){a.setup(function(){a.datapoints=[[99.999,1],[99.99999,2]]}),it("Should be rounded",function(){expect(a.data.value).to.be(99.999495),expect(a.data.valueRounded).to.be(100)}),it("should set formated falue",function(){expect(a.data.valueFormated).to.be("100")})}),b("When value to text mapping is specified",function(a){a.setup(function(){a.datapoints=[[10,1]],a.scope.panel.valueMaps=[{value:"10",text:"OK"}]}),it("Should replace value with text",function(){expect(a.data.value).to.be(10),expect(a.data.valueFormated).to.be("OK")})})})});