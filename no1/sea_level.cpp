#include <iostream>

using namespace std;

int** make_nation(int side_length);
void print_nation(int** nation, int side_length);
int caculate_max_number_of_islands(int** nation, int side_length);
int** make_map(int** nation, int side_length, int sea_level);
int find_max_element(int** nation, int side_length);
void mark_and_find_neighbor(int** map, int side_length, int row, int column, int island_cnt);

int main(int argc, char const *argv[])
{
    int iter_cnt, side_length, max_number_of_islands;
    int** nation;
    setbuf(stdout, NULL);
    scanf("%d", &iter_cnt);

    for (int i = 1; i <= iter_cnt; ++i) {
        scanf("%d", &side_length);
        nation = make_nation(side_length);
        max_number_of_islands = caculate_max_number_of_islands(nation, side_length);
        printf("#%d %d\n", i, max_number_of_islands);
    }

    return 0;
}

void print_nation(int **nation, int side_length) {
    for (int row = 0; row < side_length; row++)
    {
        for (int column = 0; column < side_length; column++)
        {
            printf("%d", nation[row][column]);
        }
        printf("\n");
    }
}

int** make_nation(int side_length) {
    int** nation = new int* [side_length];
    
    for (int i = 0; i < side_length; ++i) {
        nation[i] = new int[side_length];
    }
    
    for (int row = 0; row < side_length; ++row) {
        for (int column = 0; column < side_length; ++column) {
            scanf("%d", &nation[row][column]);
        }
    }

    return nation;
}

int caculate_max_number_of_islands(int** nation, int side_length) {
    int max_number_of_islands = 1, iter_cnt = find_max_element(nation, side_length);
    
    // -1 for not visited
    // 0 for drowned
    int** island_map;

    for (int i = 0; i <= iter_cnt; ++i) {
        int island_cnt = 1;
        island_map = make_map(nation, side_length, i);

        for (int row = 0; row < side_length; ++row) {
            for (int column = 0; column < side_length; ++column) {
                if (island_map[row][column] == -1) {
                    mark_and_find_neighbor(island_map, side_length, row, column, island_cnt);
                    ++island_cnt;
                }   
            }   
        }

        if (island_cnt - 1 > max_number_of_islands) {
            max_number_of_islands = island_cnt - 1;
        }
    }
    
    return max_number_of_islands;
}

int** make_map(int** nation, int side_length, int sea_level) {
    int** map = new int* [side_length];
    
    for (int i = 0; i < side_length; ++i) {
        map[i] = new int[side_length];
    }
    
    for (int row = 0; row < side_length; ++row) {
        for (int column = 0; column < side_length; ++column) {
            if (nation[row][column] <= sea_level) {
                map[row][column] = 0;
            } else {
                map[row][column] = -1;
            }
        }
    }

    return map;
}

int find_max_element(int** nation, int side_length) {
    int max_element = 0;

    for (int row = 0; row < side_length; ++row) {
        for (int column = 0; column < side_length; ++column) {
            if (nation[row][column] > max_element) {
                max_element = nation[row][column];
            }
        }
    }

    return max_element;
}

void mark_and_find_neighbor(int** map, int side_length, int row, int column, int island_cnt) {
    map[row][column] = island_cnt;

    // up
    if (row - 1 > -1) {
        if (map[row - 1][column] == -1) { // if not visited
            mark_and_find_neighbor(map, side_length, row - 1, column, island_cnt);
        }
    }

    // down
    if (row + 1 < side_length) {
        if (map[row + 1][column] == -1) { // if not visited
            mark_and_find_neighbor(map, side_length, row + 1, column, island_cnt);
        }
    }

    // left
    if (column - 1 > - 1) {
        if (map[row][column - 1] == -1) { // if not visited
            mark_and_find_neighbor(map, side_length, row, column - 1, island_cnt);
        }
    }

    // right
    if (column + 1 < side_length) {
        if (map[row][column + 1] == -1) { // if not visited
            mark_and_find_neighbor(map, side_length, row, column + 1, island_cnt);
        }
    }
}
