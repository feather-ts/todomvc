import {Batch, Construct, LocalStorage, On, removeFromArray, render, Route, Template, Widget} from '@feather-ts/feather-ts'
import {ListState} from './config'
import {Todo} from './todo'

export interface RouteParam {
    path: string;
}

export const Click = (selector: string): Function => On({selector: selector, event: 'click', preventDefault: true})

@Construct({selector: '.todoapp', singleton: true})
export class TodoList implements Widget {

    state = ListState.ALL

    @LocalStorage(() => Todo)
    todos: Todo[] = []

    init = (el: HTMLElement) => {
        render(this, el)
    }

    newTodo(todo: Todo) {
        this.todos.push(todo)
    }

    deleteTodo(todo: Todo) {
        removeFromArray(this.todos, [todo])
    }

    listFilter = () =>
        (todo: Todo) => this.state === ListState.ALL ||
            (this.state === ListState.COMPLETED && todo.completed) ||
            (this.state === ListState.ACTIVE && !todo.completed)

    @Route('/:path')
    locationPath(params: RouteParam) {
        if (params.path === 'active') {
            this.state = ListState.ACTIVE
        } else if (params.path === 'completed') {
            this.state = ListState.COMPLETED
        }
    }

    @Route('/')
    root() {
        this.state = ListState.ALL
    }

    @Click('.clear-completed')
    clearCompleted() {
        removeFromArray(this.todos, this.todos.filter(t => t.completed))
    }

    @Click('label[for="toggle-all"]')
    @Batch()
    toggleAll() {
        const state = !this.allCompleted()
        this.todos.forEach(t => t.completed = state)
    }

    @Template()
    toHtml() {
        return `
        <header class="header"/>
        <section class="main">
          <input class="toggle-all" type="checkbox" checked="{{todos:allCompleted}}">
          <label for="toggle-all" hidden="{{todos:isEmpty}}">Mark all as complete</label>
          <ul class="todo-list" {{todos:listFilter}}/>
        </section>
        <footer class="footer" hidden="{{todos:isEmpty}}">
          <span class="todo-count"><strong>{{todos:active}}</strong> {{todos:pluralize}} left</span>
          <ul class="filters">
            <li><a class="{{state:stateAll}}" href="#/">All</a></li>
            <li><a class="{{state:stateActive}}" href="#/active">Active</a></li>
            <li><a class="{{state:stateCompleted}}" href="#/completed">Completed</a></li>
          </ul>
          <button class="clear-completed" hidden="{{todos:noCompleted}}">Clear completed</button>
        </footer>`
    }

    stateAll = (s: ListState) => this.selectedState(s, ListState.ALL)
    stateActive = (s: ListState) => this.selectedState(s, ListState.ACTIVE)
    stateCompleted = (s: ListState) => this.selectedState(s, ListState.COMPLETED)
    isEmpty = () => this.todos.length === 0
    noCompleted = () => this.completed() === 0
    pluralize = () => this.active() === 1 ? 'item' : 'items'
    allCompleted = () => this.completed() === this.todos.length
    active = () => this.todos.length - this.completed()
    completed = () => this.todos.filter(c => c.completed).length
    selectedState = (s, state) => s === state ? 'selected' : undefined
}
