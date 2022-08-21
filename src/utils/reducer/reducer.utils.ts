import { AnyAction } from "redux";

//Type predicate functions - overuje typ argumentu

//Intersection type - je spojenie 2 typov
// type Human = {
//   name: string;
// };

// type Alien = {
//   fly: () => void;
// };

// type Hybrid = Human & Alien;

// const Josh: Hybrid = {
//   name: "josh",
//   fly: () => {},
// };

//Return type - ziska nam vrateny typ z funkcie
// type MyFunc = () => Human;

// type MyReturn = ReturnType<MyFunc>;

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreater: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

//function overloading - make multiple function type definitions of the same name. Musi mat rovnako vele parametrov ale mozu byt ineho typu. Moze vratit rozne typy na zaklade typu parametrov. Vzdycky exportujeme overload definicie

//void = undefined

//overload funkcia
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

//Povodna funkcia
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
