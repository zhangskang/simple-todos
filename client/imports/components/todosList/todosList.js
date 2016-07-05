/**
 * Created by _zsk on 2016/7/2.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js'

class TodosListCtrl {


    constructor($scope) {

        $scope.viewModel(this);
        this.subscribe('tasks');
        this.hideCompleted = false;
        this.helpers({
            tasks() {
                const selector = {};
                if (this.getReactively('hideCompleted')) {
                    selector.checked = {
                        $ne: true
                    };
                }
                return Tasks.find({},{sort:{
                    createdAt:-1,
                }});
            },
            incompleteCount() {
                return Tasks.find({
                    checked: {
                        $ne: true
                    }
                }).count();
            },
            currentUser() {
                return Meteor.user();
            }
        });
    }
    addTask(newTask) {
        // Insert a task into the collection
        Meteor.call('tasks.insert', newTask);
       /* Tasks.insert({
          text: newTask,
            createdAt: new Date,
            owner: Meteor.userId(),
            username: Meteor.user().username
        });*/

        // Clear form
        this.newTask = '';
    }
    setChecked(task) {
        // Set the checked property to the opposite of its current value
        Meteor.call('tasks.setChecked', task._id, !task.checked);
        //Tasks.update(task._id, {
        //    $set: {
        //        checked: !task.checked
        //    },
        //});
    }

    removeTask(task) {
        Tasks.remove(task._id);
    }

    setPrivate(task) {
        Meteor.call('tasks.setPrivate', task._id, !task.private);
    }
}

export default angular.module('todosList', [
    angularMeteor
])
    .component('todosList', {
        templateUrl: 'client/imports/components/todosList/todosList.html',

        controller: ['$scope', TodosListCtrl]
    });