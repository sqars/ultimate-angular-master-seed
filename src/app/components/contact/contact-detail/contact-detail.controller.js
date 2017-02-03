function ContactDetailController(){
    var ctrl = this;

    ctrl.$onChanges = function(){

    };

    ctrl.$onInit = function(){
        ctrl.isNewContact = !ctrl.contact.$id;
    };

    ctrl.saveContact = function(){
        ctrl.onSave({
            $event: {
                contact: ctrl.contact
            }
        });
    };
}

angular
    .module('components.contact')
    .controller('ContactDetailController', ContactDetailController);