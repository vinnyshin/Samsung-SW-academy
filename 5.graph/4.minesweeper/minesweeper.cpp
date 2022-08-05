#include <iostream>

using namespace std;

constexpr int MAX_MAP = 300;

int direction_row[8] = { -1, -1, -1, 0, 0, +1, +1, +1};
int direction_column[8] = {-1, 0, +1, -1, +1, -1, 0, +1};

struct Mine {
    int row;
    int column;
};

typedef Mine Coordinate;

void init_bfs(int size);
void bfs(int start_row, int start_column);
int play_minesweeper();
Coordinate* get_coordinate(int row, int column);
bool is_in_map(int row, int column);
int find_mine(int row, int column);

char map[MAX_MAP][MAX_MAP];
int map_size;
Coordinate* queue[MAX_MAP * MAX_MAP];
Coordinate coordinate_pool[MAX_MAP * MAX_MAP];
bool visited[MAX_MAP][MAX_MAP] = {{false, }, };
int coordinate_cnt;
Mine mine_pool[MAX_MAP * MAX_MAP];
int mine_cnt;

Coordinate* get_coordinate(int row, int column) {
    coordinate_pool[coordinate_cnt].row = row;
    coordinate_pool[coordinate_cnt].column = column;

    return &coordinate_pool[coordinate_cnt++];
}

int main(int argc, char** argv)
{
	int test_case, result;
	int T, N;
	
	freopen("sample_input.txt", "r", stdin);
	scanf("%d", &T);
	
    for(test_case = 1; test_case <= T; ++test_case) {
		scanf("%d", &N);
		init_bfs(N);
        result = play_minesweeper();
		printf("#%d %d\n",test_case, result);
	}

	return 0;
}

void init_bfs(int size) {
	map_size = size;
	mine_cnt = 0;

	for (int row = 0; row < map_size; ++row) {
        for (int column = 0; column < map_size; ++column) {
			scanf(" %c", &map[row][column]);
        }
    }

    for (int row = 0; row < map_size; ++row) {
        for (int column = 0; column < map_size; ++column) {
			if (map[row][column] == '*') {
                mine_pool[mine_cnt].row = row;
                mine_pool[mine_cnt].column = column;
                mine_cnt += 1;
			}
        }
    }
}

int play_minesweeper() {
    int iter_cnt = 0;

    for (int i = 0; i < map_size; i++) {
        fill_n(visited[i], map_size, false);
    }

    for (int row = 0; row < map_size; ++row) {
        for (int column = 0; column < map_size; ++column) {
			if (find_mine(row, column) == 0 && map[row][column] == '.') {
                iter_cnt += 1;
                bfs(row, column);
			}
        }
    }
    
    for (int row = 0; row < map_size; ++row) {
        for (int column = 0; column < map_size; ++column) {
            if (map[row][column] == '.') {
                iter_cnt += 1;
                bfs(row, column);
            }
        }
    }

    return iter_cnt;   
}

bool is_in_map(int row, int column) {
    return row > -1 && row < map_size && column > -1 && column < map_size;
}

void bfs(int start_row, int start_column) {
    coordinate_cnt = 0;
    int front = -1;
    int rear = -1;
    Coordinate* curr;
    int surrounded_mine_cnt = 0;
    int target_row, target_column;
    
    curr = get_coordinate(start_row, start_column);
    queue[++rear] = curr;
    visited[curr->row][curr->column] = true;

    while (front != rear) {
        curr = queue[++front];
        surrounded_mine_cnt = find_mine(curr->row, curr->column);
        map[curr->row][curr->column] = '0' + surrounded_mine_cnt;
        
        if (surrounded_mine_cnt == 0) {
            for (int i = 0; i < 8; ++i) {
                target_row = curr->row + direction_row[i];
                target_column = curr->column + direction_column[i];
                
                if (is_in_map(target_row, target_column) && !visited[target_row][target_column]) {
                    visited[target_row][target_column] = true;
                    queue[++rear] = get_coordinate(target_row, target_column);    
                }
            }      
        }
    }
}

int find_mine(int row, int column) {
    int surrounded_mine_cnt = 0;
    int target_row, target_column;

    for (int i = 0; i < 8; ++i) {
        target_row = row + direction_row[i];
        target_column = column + direction_column[i];
        
        if (is_in_map(target_row, target_column) && map[target_row][target_column] == '*') {
            surrounded_mine_cnt += 1;
        }
    }

    return surrounded_mine_cnt;
}
