#include <iostream>
#include <map>
#include <unordered_map>
#include <unordered_set>

using namespace std;

#define TOTAL_NUMBER_OF_SUBSET (1 << 4)
#define A_MASK 8 // 1000
#define B_MASK 4 // 0100
#define C_MASK 2 // 0010
#define D_MASK 1 // 0001

map<int, int> table_a;
map<int, int> table_b;

// unordered_map<int, int> table_a;
// unordered_map<int, int> table_b;
unordered_set<int> subset_flag_set;
// int subset_flag_set [TOTAL_NUMBER_OF_SUBSET] = {0, };

// 0 means it's time to use table_a, 1 for table_b.
int table_flag = 0;


int calculate_all_possible_cases();

int main(int argc, char const *argv[]) {
    freopen("sample_input.txt", "r", stdin);
    
    int T, result;
	
    scanf("%d", &T);

	for (int tc = 1; tc <= T; tc++) {
        result = calculate_all_possible_cases();
        printf("#%d %d\n", tc, result);
	}
    
    return 0;
}

int calculate_all_possible_cases() {
    int i = 0;
    char buffer[10001];
    int result = 0, previous_case, next_case;
    
    table_flag = 0;
    table_a[A_MASK] = 1;
    
    scanf("%s", buffer);
    
    while (true) {
        map<int, int>& current_table = (table_flag != 0 ? table_b : table_a);
        map<int, int>& next_table = (table_flag != 0 ? table_a : table_b);
        
        if (buffer[i] == 'A') {
            next_case = A_MASK;
        } else if (buffer[i] == 'B') {
            next_case = B_MASK;
        } else if (buffer[i] == 'C') {
            next_case = C_MASK;
        } else if (buffer[i] == 'D') {
            next_case = D_MASK;
        } else if (buffer[i] == '\0') {
            for (auto it = current_table.begin(); it != current_table.end(); ++it) {
                result += it->second;
                result = result % 1000000007;
            }
            break;
        } else {
            printf("undefined char: %c\n", buffer[i]);
        }
        
        for (auto it = current_table.begin(); it != current_table.end();) {
            if (it->second > 0) {
                previous_case = it->first;

                for(int j = 1; j < TOTAL_NUMBER_OF_SUBSET; ++j) {
                    if ((previous_case & (next_case | j)) > 0) {
                        subset_flag_set.insert(next_case | j);
                    }
                }
                
                for (int key : subset_flag_set) {
                    next_table[key] = next_table.find(key) != next_table.end()
                                        ? (next_table[key] + 1) %  1000000007 : next_table[key] = 1;
                }
                --it->second;
                subset_flag_set.clear();
            } else {
                it = current_table.erase(it);
            }            
        }

        cout << "current char: " << buffer[i] << endl;  
        for (auto it = next_table.begin(); it != next_table.end(); ++it) {
            cout << it->first << " " << it->second << endl;
        }
        cout << endl;
        
        table_flag = ~table_flag;
        ++i;
    }

    table_a.clear();
    table_b.clear();
    subset_flag_set.clear();

    return result;
}
