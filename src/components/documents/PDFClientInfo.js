import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text } from '@react-pdf/renderer';
import { styles } from './styles';
export const PDFClientInfo = ({ client }) => (_jsxs(View, { style: styles.clientSection, children: [_jsx(Text, { style: styles.clientTitle, children: "Client" }), _jsx(Text, { style: styles.clientInfo, children: client.name }), _jsx(Text, { style: styles.clientInfo, children: client.address }), _jsxs(Text, { style: styles.clientInfo, children: [client.postalCode, " ", client.city] }), _jsx(Text, { style: styles.clientInfo, children: client.email }), _jsx(Text, { style: styles.clientInfo, children: client.phone }), client.siret && (_jsxs(Text, { style: styles.clientInfo, children: ["SIRET : ", client.siret] }))] }));
