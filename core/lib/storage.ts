import AppConstants from "../constants/app-constants";

export const getStorageLink = (endpoint: string | null): string | null => {
    if (endpoint) {
        return AppConstants.storage_url + endpoint
    }
    
    return null;
}