import {start} from '@feather-ts/feather-ts/dist/decorators/construct'
import '../css/app.css'

import './config'
import './header'
import './todo'
import './todo-list'
import {runRoutes} from '@feather-ts/feather-ts';

start()
runRoutes()
