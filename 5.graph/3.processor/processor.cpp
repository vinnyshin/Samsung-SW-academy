#include <iostream>
#include <algorithm>

using namespace std;

constexpr int MAX_CORE = 12;
constexpr int MAX_MAP = 12;
constexpr int UP = 1;
constexpr int DOWN = 2;
constexpr int LEFT = 3;
constexpr int RIGHT = 4;
constexpr int FINISH = 5;
constexpr unsigned int X_MASK = 240;
constexpr unsigned int Y_MASK = 15;

int cell[MAX_MAP][MAX_MAP];
int cell_size;

struct Core {
    unsigned int packed_row_column;
    int direction;
    int prev_direction;
    int prev_cable_cnt;
};

void init_dfs(int map_size);
int dfs();
Core* new_core(int row, int column);
unsigned int pack_row_column(int row, int column);
bool can_be_core(int row, int column);

Core core_pool[MAX_CORE];
Core* possible_core_pool[MAX_CORE];
int core_cnt;

Core* new_core(int row, int column) {
    core_pool[core_cnt].packed_row_column = pack_row_column(row, column);
    core_pool[core_cnt].direction = 1;
    core_pool[core_cnt].prev_direction = 0;
    core_pool[core_cnt].prev_cable_cnt = 0;

    return &core_pool[core_cnt++];
}


int main(int argc, char** argv)
{
	int test_case;
	int T, N;
	
	freopen("sample_input.txt", "r", stdin);
	scanf("%d", &T);
	
    for(test_case = 1; test_case <= T; ++test_case) {
		scanf("%d", &N);
		init_dfs(N);
		printf("#%d %d\n",test_case, dfs());
	}

	return 0;
}

void init_dfs(int map_size) {
	cell_size = map_size;
	core_cnt = 0;
    for (int i = 0; i < MAX_CORE; i++) {
        core_pool[i].direction = 1;
        core_pool[i].prev_cable_cnt = 0;
        core_pool[i].prev_direction = 0;
        core_pool[i].packed_row_column = 0;
    }
    
	for (int row = 0; row < cell_size; ++row) {
        for (int column = 0; column < cell_size; ++column) {
			scanf("%d", &cell[row][column]);
        }
    }

    for (int row = 0; row < cell_size; ++row) {
        for (int column = 0; column < cell_size; ++column) {
			if (cell[row][column] != 0 &&
				row != 0 &&
				row != cell_size - 1 &&
				column != 0 &&
				column != cell_size - 1) {
                
                if (can_be_core(row, column)) {
                    new_core(row, column);   
                }
			}
        }
    }
}

int go_up(int row, int column) {
	int cable_cnt = 0;
	for (int i = row - 1; i >= 0; --i) {
		if (cell[i][column] == 1) {
			for (int j = row - 1; j > i; --j) {
				cell[j][column] = 0;	
			}
			return 0;
		} else {
			cell[i][column] = 1;
			++cable_cnt;
		}
	}
	
	return cable_cnt;
}

int go_down(int row, int column) {
	int cable_cnt = 0;
	for (int i = row + 1; i < cell_size; ++i) {
		if (cell[i][column] == 1) {
			for (int j = row + 1; j < i; ++j) {
				cell[j][column] = 0;	
			}
			return 0;
		} else {
			cell[i][column] = 1;
			++cable_cnt;
		}
	}
	
	return cable_cnt;
}

int go_left(int row, int column) {
	int cable_cnt = 0;
	for (int i = column - 1; i >= 0; --i) {
		if (cell[row][i] == 1) {
			for (int j = column - 1; j > i; --j) {
				cell[row][j] = 0;	
			}
			return 0;
		} else {
			cell[row][i] = 1;
			++cable_cnt;
		}
	}
	
	return cable_cnt;
}

int go_right(int row, int column) {
	int cable_cnt = 0;
	for (int i = column + 1; i < cell_size; ++i) {
		if (cell[row][i] == 1) {
			for (int j = column + 1; j < i; ++j) {
				cell[row][j] = 0;	
			}
			return 0;
		} else {
			cell[row][i] = 1;
			++cable_cnt;
		}
	}
	
	return cable_cnt;
}

void undo(int row, int column, int direction) {
	switch (direction) {
		case UP:
			for (int i = row - 1; i >= 0; --i) {
				cell[i][column] = 0;
			}
			break;
		case DOWN:
			for (int i = row + 1; i < cell_size; ++i) {
				cell[i][column] = 0;
			}
			break;
		case LEFT:
			for (int i = column - 1; i >= 0; --i) {
				cell[row][i] = 0;
			}
			break;
		case RIGHT:
			for (int i = column + 1; i < cell_size; ++i) {
				cell[row][i] = 0;
			}
			break;
		default:
			break;
	}
}

bool can_be_core(int row, int column) {
    bool flag = true;

    if (go_up(row, column)) {
        undo(row, column, UP);
    } else if (go_down(row, column)) {
        undo(row, column, DOWN);
    } else if (go_left(row, column)) {
        undo(row, column, LEFT);
    } else if (go_right(row, column)) {
        undo(row, column, RIGHT);
    } else {
        flag = false;
    }
        
    return flag;
}


unsigned int pack_row_column(int row, int column) {
    unsigned int result = 0;

    result |= row << 4;
    result |= column;

    return result;
}

int dfs() {
    Core* stack[MAX_CORE];
    Core* curr_core;
    int top = -1, max_top = -1, row, column, current_cable_cnt;
    unsigned int packed_row_column;
    int minimum_cable_cnt[MAX_CORE], total_cable_cnt = 0;
	fill_n(minimum_cable_cnt, MAX_CORE, (cell_size * cell_size));

    stack[++top] = &core_pool[0];

    while (top != -1) {
        curr_core = stack[top--];
        packed_row_column = curr_core->packed_row_column;
        row = (packed_row_column & X_MASK) >> 4;
        column = packed_row_column & Y_MASK;
		
        if (curr_core->prev_direction) {
            undo(row, column, curr_core->prev_direction);
            total_cable_cnt -= curr_core->prev_cable_cnt;
        }

        if (curr_core->direction != FINISH) {
            stack[++top] = curr_core;

            max_top = top > max_top ? top : max_top;
            
            switch (curr_core->direction) {
            case UP:
                if(current_cable_cnt = go_up(row, column)) {
                    curr_core->prev_direction = curr_core->direction;
                    curr_core->prev_cable_cnt = current_cable_cnt;
                    total_cable_cnt += current_cable_cnt;    
                    minimum_cable_cnt[top] = minimum_cable_cnt[top] > total_cable_cnt ? total_cable_cnt : minimum_cable_cnt[top];
                    if (top + 1 < core_cnt) {
                        ++top;
                        stack[top] = &core_pool[top];
                    }
                }
                break;
		    case DOWN:
                if(current_cable_cnt = go_down(row, column)) {
                    curr_core->prev_direction = curr_core->direction;
                    curr_core->prev_cable_cnt = current_cable_cnt;
                    total_cable_cnt += current_cable_cnt;    
                    minimum_cable_cnt[top] = minimum_cable_cnt[top] > total_cable_cnt ? total_cable_cnt : minimum_cable_cnt[top];
                    if (top + 1 < core_cnt) {
                        ++top;
                        stack[top] = &core_pool[top];
                    }
                } else {
                    total_cable_cnt += curr_core->prev_cable_cnt;
                }
                break;
            case LEFT:
                if(current_cable_cnt = go_left(row, column)) {
                    curr_core->prev_direction = curr_core->direction;
                    curr_core->prev_cable_cnt = current_cable_cnt;
                    total_cable_cnt += current_cable_cnt;    
                    minimum_cable_cnt[top] = minimum_cable_cnt[top] > total_cable_cnt ? total_cable_cnt : minimum_cable_cnt[top];
                    if (top + 1 < core_cnt) {
                        ++top;
                        stack[top] = &core_pool[top];
                    }
                } else {
                    total_cable_cnt += curr_core->prev_cable_cnt;
                }
                break;
            case RIGHT:
                if(current_cable_cnt = go_right(row, column)) {
                    curr_core->prev_direction = curr_core->direction;
                    curr_core->prev_cable_cnt = current_cable_cnt;
                    total_cable_cnt += current_cable_cnt;    
                    minimum_cable_cnt[top] = minimum_cable_cnt[top] > total_cable_cnt ? total_cable_cnt : minimum_cable_cnt[top];
                    if (top + 1 < core_cnt) {
                        ++top;
                        stack[top] = &core_pool[top];
                    }
                } else {
                    total_cable_cnt += curr_core->prev_cable_cnt;
                }
			    break;
            }
            ++curr_core->direction;
        } else {
            curr_core->direction = UP;
            curr_core->prev_direction = 0;
            curr_core->prev_cable_cnt = 0;
        }
    
    }    

    return minimum_cable_cnt[max_top];
}
