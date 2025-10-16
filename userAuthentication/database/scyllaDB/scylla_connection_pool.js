/**
 * @fileoverview Manages a single, reusable connection pool to ScyllaDB.
 * This is crucial for high-performance applications, as creating new connections 
 * for every request is expensive.
 */
// Install the official driver: npm install cassandra-driver
const cassandra = require('cassandra-driver');

// Default contact points for the ScyllaDB instance running in Docker
// Host: 'localhost', Port: 9042 (mapped from the container)
const DEFAULT_CONTACT_POINTS = ['127.0.0.1:9042'];

// This will hold the single, initialized client instance
let scyllaClient = null;

/**
 * Initializes and returns the ScyllaDB client (connection pool).
 * If the client is already initialized, it returns the existing instance.
 *
 * @param {string | string[]} [contactPoints=DEFAULT_CONTACT_POINTS] The host:port 
 * strings for the ScyllaDB cluster (e.g., ['127.0.0.1:9042']).
 * @param {string} [keyspace] Optional keyspace to connect to directly.
 * @returns {cassandra.Client} The initialized Cassandra/ScyllaDB client instance.
 * @throws {Error} If connection fails.
 */
function getScyllaClient(contactPoints = DEFAULT_CONTACT_POINTS, keyspace) {
    if (scyllaClient) {
        return scyllaClient;
    }

    try {
        const points = Array.isArray(contactPoints) ? contactPoints : [contactPoints];
        
        console.log(`Initializing ScyllaDB client connecting to: ${points.join(', ')}`);

        const clientOptions = {
            contactPoints: points,
            localDataCenter: 'datacenter1', // Default DC name for local/small setups
            protocolOptions: { port: 9042 },
            keyspace: keyspace, // Connects directly to keyspace if provided
            pooling: {
                // Adjust these based on expected load
                coreConnectionsPerHost: {
                    [cassandra.types.distance.local]: 2,
                    [cassandra.types.distance.remote]: 1
                }
            },
            // Wait longer for the first connection/topology update
            socketOptions: { connectTimeout: 10000, readTimeout: 60000 } 
        };

        scyllaClient = new cassandra.Client(clientOptions);

        // Add a check to confirm the client is connected asynchronously
        // Note: The driver handles connection logic internally, but we can log the event.
        scyllaClient.on('log', (level, className, message, furtherInfo) => {
            if (level === 'info' && message.includes('successfully connected')) {
                console.log("ScyllaDB Client connected successfully.");
            }
        });

        // Add a shutdown hook for graceful exit (optional but recommended)
        process.on('SIGINT', () => {
            if (scyllaClient) {
                console.log('ScyllaDB Client shutting down...');
                scyllaClient.shutdown(() => {
                    console.log('ScyllaDB Client shut down gracefully.');
                    process.exit(0);
                });
            }
        });

        return scyllaClient;

    } catch (error) {
        console.error("CRITICAL ERROR: Failed to initialize ScyllaDB client.", error);
        throw new Error("ScyllaDB connection initialization failed.");
    }
}

// Export the client manager and the shutdown function
module.exports = { 
    getScyllaClient,
    shutdown: () => scyllaClient?.shutdown(),
    DEFAULT_CONTACT_POINTS
};
