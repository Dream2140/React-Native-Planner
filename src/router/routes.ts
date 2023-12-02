import {TaskListScreen} from "../pages/taskListScreen";
import HelloScreen from "../pages/HelloScreen/HelloScreen";
import WelcomeScreen from "../pages/WelcomeScreen/WelcomeScreen";

export enum Routes {
    AUTH = 'Authentication',
    TASKS_LIST = 'Tasks',
    TASK = 'TaskPage',
    MANAGE_TASK = 'ManageTask',
    MAP = 'Map',
    GENERATOR = 'Generator',
}

export const TABS_ROUTES = {
    tasks: {
        name: Routes.TASKS_LIST,
        component:  TaskListScreen
    },
    map: {
        name: Routes.MAP,
        component:  HelloScreen
    },
    generator: {
        name: Routes.GENERATOR,
        component:  WelcomeScreen
    }
}

