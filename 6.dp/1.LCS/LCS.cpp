#include <iostream>
#include <string.h>

using namespace std;

constexpr int MAX_STR = 1000;

char str1[MAX_STR + 1], str2[MAX_STR + 1];
int dp[MAX_STR + 1][MAX_STR + 1];

int LCS();

int main(int argc, char** argv)
{
	int test_case, T, result;
	
	freopen("sample_input.txt", "r", stdin);
	scanf("%d", &T);
	
    for(test_case = 1; test_case <= T; ++test_case) {
		scanf("%s %s", str1, str2);
		result = LCS();
        printf("#%d %d\n", test_case, result);
	}

	return 0;
}

int LCS() {
    int max_lcs_length = 0, str1_len = strlen(str1), str2_len = strlen(str2), count;
    str1_len > str2_len ? count = str1_len : count = str2_len;

    for (int i = 0; i <= count; ++i) {
        dp[0][i] = 0;
        dp[i][0] = 0;
    }
    
    for (int row = 1; row <= str2_len; ++row) {
        for (int column = 1; column <= str1_len; ++column) {
            if (str1[column - 1] != str2[row - 1]) {
                dp[row][column] = max(dp[row - 1][column], dp[row][column - 1]);
            } else { // str1[column - 1] == str2[row - 1]
                dp[row][column] = dp[row - 1][column - 1] + 1;
            }
        }
    }
    
    return dp[str2_len][str1_len];
}