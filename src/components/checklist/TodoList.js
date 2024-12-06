import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useApp } from "../../context/AppContext";
import { formatDate } from "../../utils/dateUtils";
export const TodoList = () => {
    const { state, dispatch } = useApp();
    const [newTodo, setNewTodo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const handleAddTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim())
            return;
        const todo = {
            id: uuidv4(),
            text: newTodo,
            completed: false,
            dueDate: dueDate || undefined,
            createdAt: new Date().toISOString(),
        };
        dispatch({ type: "ADD_TODO", payload: todo });
        setNewTodo("");
        setDueDate("");
    };
    const handleToggleTodo = (id) => {
        const todo = state.todos?.find((t) => t.id === id);
        if (todo) {
            dispatch({
                type: "UPDATE_TODO",
                payload: { ...todo, completed: !todo.completed },
            });
        }
    };
    const handleDeleteTodo = (id) => {
        dispatch({ type: "DELETE_TODO", payload: id });
    };
    const sortedTodos = (state.todos || []).sort((a, b) => {
        if (a.completed === b.completed) {
            if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return a.completed ? 1 : -1;
    });
    return (_jsxs(Card, { className: "h-full", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Checklist" }), _jsx("form", { onSubmit: handleAddTodo, className: "mb-4", children: _jsxs("div", { className: "flex gap-2", children: [_jsx("div", { className: "flex-grow", children: _jsx(Input, { label: "", placeholder: "Ajouter une t\u00E2che...", value: newTodo, onChange: (e) => setNewTodo(e.target.value) }) }), _jsx("div", { className: "w-40", children: _jsx(Input, { label: "", type: "date", value: dueDate, onChange: (e) => setDueDate(e.target.value) }) }), _jsx(Button, { type: "submit", className: "mt-1", children: _jsx(Plus, { size: 20 }) })] }) }), _jsx("div", { className: "space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto", children: sortedTodos.map((todo) => (_jsxs("div", { className: `flex items-center gap-2 p-2 rounded hover:bg-gray-50 ${todo.completed ? "opacity-50" : ""}`, children: [_jsx("button", { onClick: () => handleToggleTodo(todo.id), className: `w-5 h-5 rounded border flex items-center justify-center ${todo.completed
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-gray-300"}`, children: todo.completed && _jsx(Check, { size: 14 }) }), _jsxs("span", { className: "flex-grow", children: [_jsx("span", { className: `${todo.completed ? "line-through text-gray-500" : ""}`, children: todo.text }), todo.dueDate && (_jsx("span", { className: "ml-2 text-sm text-gray-500", children: formatDate(todo.dueDate) }))] }), _jsx("button", { onClick: () => handleDeleteTodo(todo.id), className: "text-gray-400 hover:text-red-500", children: _jsx(Trash2, { size: 16 }) })] }, todo.id))) })] }));
};
