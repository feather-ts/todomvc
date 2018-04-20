import {ArrayWidget} from '@feather-ts/feather-ts/dist/decorators/construct'
import {TemplateNode} from '@feather-ts/feather-ts/dist/decorators/template-node'
import {Storable} from '@feather-ts/feather-ts/dist/decorators/local-storage'
import {On, Scope} from '@feather-ts/feather-ts/dist/decorators/event'
import {Template} from '@feather-ts/feather-ts/dist/decorators/template'
import {Inject} from '@feather-ts/feather-ts/dist/decorators/inject'
import {Click, TodoList} from './todo-list'
import {ENTER, ESC} from './config'

export class Todo implements ArrayWidget {

    @Storable() completed: boolean
    @Storable() name: string
    @Inject() todoList: TodoList
    @TemplateNode('.edit') edit: HTMLInputElement

    editing = false

    constructor(name: string, completed: boolean = false) {
        this.completed = completed
        this.name = name
    }

    @On({event: 'click', selector: '.toggle'})
    complete(ev) {
        this.completed = ev.target.checked
    }

    @Click('.destroy')
    deleteSelf() {
        this.todoList.deleteTodo(this)
    }

    @On({event: 'dblclick', selector: 'label'})
    startEditing(ev, label: Element) {
        this.edit.value = this.name
        this.editing = true
        this.edit.focus()
    }

    @On({event: 'keyup', selector: '.edit'})
    endEditing(ev: KeyboardEvent) {
        if (ev.keyCode === ENTER) {
            this.name = this.edit.value.trim()
            if (!this.name) {
                this.todoList.deleteTodo(this)
            }
            this.stopEditing()
        }
    }

    @On({event: 'keyup', scope: Scope.Direct})
    cancelEditing(ev: KeyboardEvent) {
        if (ev.keyCode === ESC) {
            this.stopEditing()
        }
    }

    @On({event: ['blur','focusout'], selector: 'input.edit', scope: Scope.Direct})
    stopEditing() {
        this.editing = false
    }

    @Template()
    toHtml() {
        return `
        <li class="{{completed:completedClass}} {{editing:editingClass}}">
          <div class="view">
            <input class="toggle" type="checkbox" checked="{{completed}}">
            <label>{{name}}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" placeholder="Create a TodoMVC template" value="{{name}}">
        </li>`
    }

    completedClass = (completed: boolean) => completed ? 'completed' : undefined
    editingClass = (editing: boolean) => editing ? 'editing' : undefined
}
