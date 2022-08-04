bool game_map[10][10];
int game_map_size = 0;

#define UP(y) (y - 1)
#define DOWN(y) (y + 1)
#define LEFT(x) (x - 1)
#define RIGHT(x) (x + 1)

constexpr unsigned int X_MASK = 240;
constexpr unsigned int Y_MASK = 15;
unsigned int queue[100];

unsigned int pack_x_y_coordinate(int x, int y) {
    unsigned int result = 0;

    result |= x << 4;
    result |= y;

    return result;
}

bool is_in_map(int x, int y) {
    bool is_wall = game_map[y][x] != 1 ? false : true;
    return x > -1 && x < game_map_size && y > -1 && y < game_map_size && !is_wall;
}

void bfs_init(int map_size, int map[10][10]) {
    game_map_size = map_size;

    for (int row = 0; row < game_map_size; ++row) {
        for (int column = 0; column < game_map_size; ++column) {
            game_map[row][column] = map[row][column];
        }
    }
}

int bfs(int x1, int y1, int x2, int y2) {
    if (x1 == x2 && y1 == y2) {
        return 0;
    }

    int front = -1;
    int rear = -1;
    int size = 0;
    unsigned int curr_packed_coordinate;
    int curr_x, curr_y;
    bool visited[10][10] = {{false, }, };
    int distance_map[10][10] = {{0, }, };

    x1 = x1 - 1;
    y1 = y1 - 1;
    x2 = x2 - 1;
    y2 = y2 - 1;

    queue[++rear] = pack_x_y_coordinate(x1, y1);
    visited[y1][x1] = true;
    ++size;

    while (size != 0) {
        curr_packed_coordinate = queue[++front];
        --size;
        curr_x = (curr_packed_coordinate & X_MASK) >> 4;
        curr_y = curr_packed_coordinate & Y_MASK;

        if (is_in_map(curr_x, UP(curr_y)) && !visited[UP(curr_y)][curr_x]) {
            visited[UP(curr_y)][curr_x] = true;
            queue[++rear] = pack_x_y_coordinate(curr_x, UP(curr_y));
            distance_map[UP(curr_y)][curr_x] = distance_map[curr_y][curr_x] + 1;
            ++size;
        }
        if (is_in_map(curr_x, DOWN(curr_y)) && !visited[DOWN(curr_y)][curr_x]) {
            visited[DOWN(curr_y)][curr_x] = true;
            queue[++rear] = pack_x_y_coordinate(curr_x, DOWN(curr_y));
            distance_map[DOWN(curr_y)][curr_x] = distance_map[curr_y][curr_x] + 1;
            ++size;
        }
        if (is_in_map(LEFT(curr_x), curr_y) && !visited[curr_y][LEFT(curr_x)]) {
            visited[curr_y][LEFT(curr_x)] = true;
            queue[++rear] = pack_x_y_coordinate(LEFT(curr_x), curr_y);
            distance_map[curr_y][LEFT(curr_x)] = distance_map[curr_y][curr_x] + 1;
            ++size;
        }
        if (is_in_map(RIGHT(curr_x), curr_y) && !visited[curr_y][RIGHT(curr_x)]) {
            visited[curr_y][RIGHT(curr_x)] = true;
            queue[++rear] = pack_x_y_coordinate(RIGHT(curr_x), curr_y);
            distance_map[curr_y][RIGHT(curr_x)] = distance_map[curr_y][curr_x] + 1;
            ++size;
        }
    }
    
    return distance_map[y2][x2] != 0 ? distance_map[y2][x2] : -1;
}