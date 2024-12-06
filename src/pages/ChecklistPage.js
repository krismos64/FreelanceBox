import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TodoList } from '../components/checklist/TodoList';
import { PageTransition } from '../components/PageTransition';
const ChecklistPage = () => {
    return (_jsx(PageTransition, { children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Checklist" }), _jsx("div", { className: "max-w-3xl", children: _jsx(TodoList, {}) })] }) }));
};
export default ChecklistPage;
