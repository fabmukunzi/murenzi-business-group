export const formatTimestamp = () => {
    const now = new Date();
    return now.toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
};