-- Enable pgvector extension for AI/semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Example: Add vector column to contacts for semantic search
-- ALTER TABLE contacts ADD COLUMN embedding vector(1536);

-- Create vector index for similarity search
-- CREATE INDEX ON contacts USING ivfflat (embedding vector_cosine_ops);
