import {Construct, Inject, On, render, Scope, Template, TemplateNode, Widget} from '@feather-ts/feather-ts'
import {TodoList} from './todo-list'
import {ENTER} from './config'
import {Todo} from './todo'

@Construct({selector: '.header'})
class Header implements Widget {

    @Inject() todoList: TodoList
    @TemplateNode('.new-todo') edit: HTMLInputElement

    init(element: Element): void {
        render(this, element)
    }

    @On({event: 'keypress', selector: 'input', scope: Scope.Direct})
    createTodo(ev: KeyboardEvent) {
        const e = this.edit
        if (ev.keyCode === ENTER && !!e.value.trim()) {
            this.todoList.newTodo(new Todo(e.value))
            e.value = ''
        }
    }

    @Template()
    toHtml() {
        return `
            <h1>todos</h1>
            <input class="new-todo" id="new-todo" placeholder="What needs to be done?" autofocus>
        `
    }
}
