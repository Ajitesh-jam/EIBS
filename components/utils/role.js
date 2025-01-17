function getUserRole() {
    try {
        const userRole = localStorage.getItem('userRole');
        if (userRole === null) {
            console.warn('User role not found in localStorage');
            return null; // or provide a default value, e.g., 'guest'
        }
        return userRole;
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return null; // or provide a default value, e.g., 'guest'
    }
}

function setUserRole(userRole) {
    try {
        localStorage.setItem('userRole', userRole);
        console.log('User role stored successfully');
    } catch (error) {
        console.error('Error storing user role in localStorage:', error);
    }
}

export { getUserRole, setUserRole };