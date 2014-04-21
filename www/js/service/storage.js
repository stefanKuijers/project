angular.module('project.service.persistencejs', [])
    .service('Persistencejs', [function() {
    persistence.store.websql.config(
        persistence,
        'Project_Database',         // DB name
        '0.0.1',                    // DB version
        'Database for med project', // DB display name and description
        5 * 1024 * 1024,            // DB size (5 MB)
        0                           // SQLitePlugin Background processing disabled
    );

    var Setting = persistence.define('SettingTable', {
        key: "TEXT",
        value: "TEXT",
        type: "TEXT"
    });

    persistence.schemaSync();

    return {
        //singleton containing all methods to be called
        add: function(item) {
            var s = new Setting();
            s.key = item.key;
            s.value = item.value ? 'true' : 'false';
            s.type = item.type;
            persistence.add(s);
            persistence.flush();
        },

        updateOrAdd: function(key, value, type) {
            var insert = function(key, value, type) {
                    self.add({
                        key: key,
                        value: value,
                        type: type,
                    });
                },
                self = this;

            Setting.all().filter('key','=',key).one(function(item){
                if (!item && type) {
                    insert(key, value, type);
                    return;
                }
                item.value = value ? 'true' : 'false';
                persistence.flush();
            });
        },

        update: function(key, value) {
            Setting.all().filter('key','=',key).one(function(item){
                if (!item) return;
                item.value = value ? 'true' : 'false';
                persistence.flush();
            });
        },

        remove: function(key) {
            Setting.all().filter('key','=',key).destroyAll();
        },

        clearAllItems: function() {
            Setting.all().destroyAll();
        },

        fetchAll: function(caller_scope, assignKeyValues) {
            assignKeyValues = assignKeyValues || false;
            Setting.all().list(function(items){
                var itemCount = items.length,
                    settings = [];

                items.forEach(function(item){
                    var setting = {
                        key: item.key,
                        value: null,
                        type: item.type
                    };

                    // some wacky hacky stuff
                    switch(setting.type) {
                        case "bool":
                            setting.value = (value == 'true');
                            break;
                        case "num":
                        case "int":
                            setting.value = new Number(item.value);
                            break;
                        default:
                            setting.value = item.value;
                    }

                    settings.push(setting);
                    if(--itemCount == 0){
                        if (assignKeyValues) {
                            for (var i = 0; i < settings.length; i++) {
                                caller_scope[settings[i].key] = settings[i].value;
                            }
                        } else {
                            caller_scope.settings = settings;
                        }
                    }
                });
            });
        }
    };
}]);