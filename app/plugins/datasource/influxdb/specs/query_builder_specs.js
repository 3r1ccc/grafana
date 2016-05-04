/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["require","exports","app/plugins/datasource/influxdb/query_builder","test/lib/common"],function(a,b,c,d){d.describe("InfluxQueryBuilder",function(){d.describe("when building explore queries",function(){d.it("should only have measurement condition in tag keys query given query with measurement",function(){var a=new c({measurement:"cpu",tags:[]}),b=a.buildExploreQuery("TAG_KEYS");d.expect(b).to.be('SHOW TAG KEYS FROM "cpu"')}),d.it("should handle regex measurement in tag keys query",function(){var a=new c({measurement:"/.*/",tags:[]}),b=a.buildExploreQuery("TAG_KEYS");d.expect(b).to.be("SHOW TAG KEYS FROM /.*/")}),d.it("should have no conditions in tags keys query given query with no measurement or tag",function(){var a=new c({measurement:"",tags:[]}),b=a.buildExploreQuery("TAG_KEYS");d.expect(b).to.be("SHOW TAG KEYS")}),d.it("should have where condition in tag keys query with tags",function(){var a=new c({measurement:"",tags:[{key:"host",value:"se1"}]}),b=a.buildExploreQuery("TAG_KEYS");d.expect(b).to.be("SHOW TAG KEYS WHERE \"host\" = 'se1'")}),d.it("should have no conditions in measurement query for query with no tags",function(){var a=new c({measurement:"",tags:[]}),b=a.buildExploreQuery("MEASUREMENTS");d.expect(b).to.be("SHOW MEASUREMENTS")}),d.it("should have where condition in measurement query for query with tags",function(){var a=new c({measurement:"",tags:[{key:"app",value:"email"}]}),b=a.buildExploreQuery("MEASUREMENTS");d.expect(b).to.be("SHOW MEASUREMENTS WHERE \"app\" = 'email'")}),d.it("should have where tag name IN filter in tag values query for query with one tag",function(){var a=new c({measurement:"",tags:[{key:"app",value:"asdsadsad"}]}),b=a.buildExploreQuery("TAG_VALUES","app");d.expect(b).to.be('SHOW TAG VALUES WITH KEY = "app"')}),d.it("should have measurement tag condition and tag name IN filter in tag values query",function(){var a=new c({measurement:"cpu",tags:[{key:"app",value:"email"},{key:"host",value:"server1"}]}),b=a.buildExploreQuery("TAG_VALUES","app");d.expect(b).to.be('SHOW TAG VALUES FROM "cpu" WITH KEY = "app" WHERE "host" = \'server1\'')}),d.it("should switch to regex operator in tag condition",function(){var a=new c({measurement:"cpu",tags:[{key:"host",value:"/server.*/"}]}),b=a.buildExploreQuery("TAG_VALUES","app");d.expect(b).to.be('SHOW TAG VALUES FROM "cpu" WITH KEY = "app" WHERE "host" =~ /server.*/')}),d.it("should build show field query",function(){var a=new c({measurement:"cpu",tags:[{key:"app",value:"email"}]}),b=a.buildExploreQuery("FIELDS");d.expect(b).to.be('SHOW FIELD KEYS FROM "cpu"')})})})});