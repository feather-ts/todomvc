import {Construct, Widget} from '@feather-ts/feather-ts/dist/decorators/construct'
import {Inject} from '@feather-ts/feather-ts/dist/decorators/inject'
import {render} from '@feather-ts/feather-ts/dist/core/bind'
import {Template} from '@feather-ts/feather-ts/dist/decorators/template'
import {On, Scope} from '@feather-ts/feather-ts/dist/decorators/event'
import {TodoList} from './todo-list'
import {ENTER} from './config'
import {Todo} from './todo'
import {TemplateNode} from '@feather-ts/feather-ts/dist/decorators/template-node'

@Construct({selector: '.header'})
class Header implements Widget {

    @Inject() todoList: TodoList
    @TemplateNode('input') edit: HTMLInputElement

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
