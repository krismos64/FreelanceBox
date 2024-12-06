import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text } from '@react-pdf/renderer';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
import { styles } from './styles';
export const PDFHeader = ({ document }) => {
    const { state } = useApp();
    const { companySettings } = state;
    return (_jsxs(View, { style: styles.header, children: [_jsxs(View, { style: styles.companyInfo, children: [_jsx(Text, { style: styles.companyName, children: companySettings.name }), _jsx(Text, { style: styles.companyDetails, children: companySettings.address }), _jsxs(Text, { style: styles.companyDetails, children: [companySettings.postalCode, " ", companySettings.city] }), _jsxs(Text, { style: styles.companyDetails, children: ["T\u00E9l : ", companySettings.phone] }), _jsxs(Text, { style: styles.companyDetails, children: ["Email : ", companySettings.email] }), companySettings.website && (_jsxs(Text, { style: styles.companyDetails, children: ["Site web : ", companySettings.website] })), companySettings.siret && (_jsxs(Text, { style: styles.companyDetails, children: ["SIRET : ", companySettings.siret] }))] }), _jsxs(View, { style: styles.documentInfo, children: [_jsx(Text, { style: styles.documentTitle, children: document.type === 'quote' ? 'DEVIS' : 'FACTURE' }), _jsxs(Text, { style: styles.documentNumber, children: ["N\u00B0 ", document.number] }), _jsxs(Text, { style: styles.documentDate, children: ["Date : ", formatDate(document.date)] }), document.type === 'quote' && document.validUntil && (_jsxs(Text, { style: styles.documentDate, children: ["Valable jusqu'au : ", formatDate(document.validUntil)] }))] })] }));
};
