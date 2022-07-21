#include<iostream>

using namespace std;

extern void init();
extern void addNode2Tail(int data);
extern void addNodesNext2Position(int data_cnt, int position);
extern void removeNumOfNodeNext2Position(int data_cnt, int position);
extern void print10NodeFromHead();

void run();

int main(int argc, char** argv)
{
	int test_case;
	int T;

	freopen("input.txt", "r", stdin);
    
    for(test_case = 1; test_case <= 10; ++test_case) {
        printf("#%d ", test_case);
        init();
        run();
	}

	return 0;
}

void run() {
    // getting original encrypted statement.
    int original_length, cmd_cnt, position, data_cnt, data;
    char cmd;

    scanf("%d", &original_length);

    for (int i = 0; i < original_length; i++) {
        scanf("%d", &data);
        addNode2Tail(data);
    }

    // get a number of command.
    scanf("%d", &cmd_cnt);

    for (int i = 0; i < cmd_cnt; i++) {
        scanf(" %c", &cmd);
        switch (cmd) {
        case 'I':
            scanf("%d %d", &position, &data_cnt);
            addNodesNext2Position(data_cnt, position);
            break;
        case 'D':
            scanf("%d %d", &position, &data_cnt);
            removeNumOfNodeNext2Position(data_cnt, position);
            break;
        case 'A':
            scanf("%d", &data_cnt);
            for (int i = 0; i < data_cnt; i++) {
                scanf("%d", &data);
                addNode2Tail(data);
            }
            break;
        default:
            printf("invalid command\n");
            break;
        }
    }
    
    print10NodeFromHead();
}

