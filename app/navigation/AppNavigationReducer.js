import AppNavigator from "./AppNavigator";
import { StackNavigator } from 'react-navigation'
import settings from '../config/settings'

const initialView = AppNavigator.router.getActionForPathAndParams(settings.DEFAULT_INITIAL_VIEW);
const initialState = AppNavigator.router.getStateForAction(initialView);

export default function nav(state = initialState, action){

  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;

};
