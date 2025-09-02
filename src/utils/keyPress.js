export const keyPress = (handlers, options = {}) => {
    const { preventDefault = false , caseSensitive = false} = options;

    return (event) => {
        const {key} = event;

        // 기본 키 매핑
        const defaultKeyMap = {
            'Enter': 'onEnter',
            'Escape': 'onEscape',
            ' ': 'onSpace',
            'Tab': 'onTab',
            'ArrowUp': 'onArrowUp',
            'ArrowDown': 'onArrowDown',
            'ArrowLeft': 'onArrowLeft',
            'ArrowRight': 'onArrowRight',
        }
        let handlerName;

        if(defaultKeyMap[key]) {
            handlerName = defaultKeyMap[key];
        }else {
            // 커스텀 키 처리
            const normalizedKey = caseSensitive ? key : key.toLowerCase();
            handlerName = handlers[normalizedKey];
        }

        if(handlerName) {
            const shouldPreventDefault = 
            preventDefault === true || 
            (Array.isArray(preventDefault) && preventDefault.includes(key));

            if(shouldPreventDefault) {
                event.preventDefault();
            }

            handlers[handlerName](event);
        }
    }
}