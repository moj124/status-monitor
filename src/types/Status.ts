export type RecentlyBlockedKey = [string, number, string];
export type TopKey = [string, number];

export type WorkerStats = {
    wait_time: number;
    workers: number;
    waiting: number;
    idle: number;
    time_to_return: number;
    recently_blocked_keys: RecentlyBlockedKey[];
    top_keys: TopKey[];
};

export type ServerStats = {
    active_connections: number;
    wait_time: number;
    workers: [string, WorkerStats][];
    cpu_load: number;
    timers: number;
};

export type Results = {
    services: {
        redis: boolean;
        database: boolean;
    };
    stats: {
        servers_count: number;
        online: number;
        session: number;
        server: ServerStats;
    };
};

type Status = {
    status: string;
    region: string;
    roles: string[];
    results: Results;
    strict: boolean;
    server_issue: string | null;
};

export type Response = {
    data: Status,
    endpoint: string,
}

export default Status;