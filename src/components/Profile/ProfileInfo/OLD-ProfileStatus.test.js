import React from "react";
import { create } from "react-test-renderer";
import OLDProfileStatus from "./OLD-ProfileStatus";

describe("OLD ProfileStatus", () => {
    test ("status from props should be in the state", () => {
        // Что рендерим(тестируем)
        const component = create(<OLDProfileStatus status={"it-kamasutra.com"} />);
        // дай мне конкретный екземпляр
        const instance = component.getInstance();
        // где берем что ожидаем
        expect(instance.state.status).toBe("it-kamasutra.com");
    });
    test ("after creation span should br displayed with correct status", () => {
        const component = create(<OLDProfileStatus />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test ("after creation span should br displayed with correct status", () => {
        const component = create(<OLDProfileStatus />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");
    });
    test ("after creation span should br displayed with correct status", () => {
        const component = create(<OLDProfileStatus />);
        const root = component.root;
        let span = root.findByType("input");
        expect(span).toBeNull();
    });
    test ("after creation span should br displayed with correct status",  () => {
        const component = create(<OLDProfileStatus status={"it-kamasutra.com"} />);
        const root = component.root;
        let input = root.findByType("input");
        expect(input).toBe("it-kamasutra.com");
    });
    //-----------------------------------------------------------------//
    test ("input should be displayed in editeMode instead of span", () => {
        const component = create(<OLDProfileStatus status={"it-kamasutra.com"}/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe("it-kamasutra.com");
    });
    test ("callBack should be called", () => {
        const mocCallBack = jest.fn();
        const component = create(<OLDProfileStatus status={"it-kamasutra.com"} updateStatus={ mocCallBack}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mocCallBack.mock.calls.length).toBe(1);
    });
});
