export type RecentlyBlockedKey = [string, number, string]; // e.g., ["3FG7RD4yF6", 1, "2024-08-13T09:00:45.152Z"]
export type TopKey = [string, number]; // e.g., ["HeuVtDRwCu1y4Skn6aX85U54", 0.1124546553808948]

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

// Example usage:
// const exampleStatus: Status = {
//     status: "ok",
//     region: "us-east",
//     roles: ["socket"],
//     results: {
//         services: {
//             redis: true,
//             database: true
//         },
//         stats: {
//             servers_count: 2,
//             online: 2211,
//             session: 0,
//             server: {
//                 active_connections: 1702,
//                 wait_time: 229,
//                 workers: [
//                     [
//                         "requests:pageviews",
//                         {
//                             wait_time: 0,
//                             workers: 0,
//                             waiting: 0,
//                             idle: 0,
//                             time_to_return: 0,
//                             recently_blocked_keys: [],
//                             top_keys: []
//                         }
//                     ],
//                     [
//                         "io",
//                         {
//                             wait_time: 229,
//                             workers: 945,
//                             waiting: 4,
//                             idle: 94,
//                             time_to_return: 0,
//                             recently_blocked_keys: [
//                                 ["3FG7RD4yF6", 1, "2024-08-13T09:00:45.152Z"]
//                             ],
//                             top_keys: [
//                                 ["HeuVtDRwCu1y4Skn6aX85U54", 0.1124546553808948],
//                                 ["3FG7RD4yF6", 0.21765417170495768],
//                                 ["rMccHqnmWV", 0.0761789600967352],
//                                 ["Bvy5aLQrQE", 0.06287787182587666],
//                                 ["rSXw1Dkv6k", 0.10761789600967352]
//                             ]
//                         }
//                     ],
//                     [
//                         "requests:unsupported-users",
//                         {
//                             wait_time: 0,
//                             workers: 0,
//                             waiting: 0,
//                             idle: 0,
//                             time_to_return: 0,
//                             recently_blocked_keys: [],
//                             top_keys: []
//                         }
//                     ],
//                     [
//                         "recording-workers",
//                         {
//                             wait_time: 0,
//                             workers: 2,
//                             waiting: 0,
//                             idle: 2,
//                             time_to_return: 0,
//                             recently_blocked_keys: [],
//                             top_keys: []
//                         }
//                     ]
//                 ],
//                 cpu_load: 0.06,
//                 timers: 100
//             }
//         }
//     },
//     strict: false,
//     server_issue: null
// };

export default Status;