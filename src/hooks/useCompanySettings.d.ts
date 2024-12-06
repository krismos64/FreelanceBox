import { CompanySettings } from "../types";
export declare const useCompanySettings: () => {
    settings: CompanySettings;
    isLoading: boolean;
    isError: boolean;
    refetchSettings: (options?: import("@tanstack/query-core").RefetchOptions) => Promise<import("@tanstack/query-core").QueryObserverResult<CompanySettings, Error>>;
    updateSettings: (newSettings: Partial<CompanySettings>) => Promise<void>;
};
//# sourceMappingURL=useCompanySettings.d.ts.map