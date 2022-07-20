#ifndef _CRT_SECURE_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS
#endif

#include <chrono>

#include <stdio.h>
#define dprintf printf

extern void init();
extern int add(int mId, int mGrade, char mGender[7], int mScore);
extern int remove(int mId);
extern int query(int mGradeCnt, int mGrade[], int mGenderCnt, char mGender[][7], int mScore);

static double avg[4] = {0, 0, 0, 0};

/////////////////////////////////////////////////////////////////////////

#define CMD_INIT 100
#define CMD_ADD 200
#define CMD_REMOVE 300
#define CMD_QUERY 400

static bool run() {
	int q;
	scanf("%d", &q);

	int id, grade, score;
	char gender[7];
	int cmd, ans, ret;
	bool okay = false;

    std::chrono::high_resolution_clock clock;
    long long cnt[4] = {0, 0, 0, 0};
    long long ms[4] = {0, 0, 0, 0};
    decltype(clock.now()) s;

    #define TIME_START(i) cnt[i]++; s = clock.now()
    #define TIME_END(i) ms[i] += std::chrono::duration_cast<std::chrono::microseconds>(clock.now() - s).count();

	for (int i = 0; i < q; ++i) {
		scanf("%d", &cmd);
		switch (cmd) {
			case CMD_INIT:
                TIME_START(0);
				init();
                TIME_END(0);
				okay = true;
				break;
			case CMD_ADD:
				scanf("%d %d %s %d %d", &id, &grade, gender, &score, &ans);
                TIME_START(1);
				ret = add(id, grade, gender, score);
                TIME_END(0);
				if (ans != ret){
					okay = false;
                    dprintf("%d %d %d\n", id, ret, ans);
                }
				break;
			case CMD_REMOVE:
				scanf("%d %d", &id, &ans);
                TIME_START(2);
				ret = remove(id);
                TIME_END(2);
                if (ans != ret){
					okay = false;
                    dprintf("%d %d %d\n", id, ret, ans);
                }
				break;
			case CMD_QUERY: {
				int gradeCnt, genderCnt;
				int gradeArr[3];
				char genderArr[2][7];
				scanf("%d", &gradeCnt);
				if (gradeCnt == 1) {
					scanf("%d %d", &gradeArr[0], &genderCnt);
				} else if (gradeCnt == 2) {
					scanf("%d %d %d", &gradeArr[0], &gradeArr[1], &genderCnt);
				} else {
					scanf("%d %d %d %d", &gradeArr[0], &gradeArr[1], &gradeArr[2], &genderCnt);
				}
				if (genderCnt == 1) {
					scanf("%s %d %d", genderArr[0], &score, &ans);
				} else {
					scanf("%s %s %d %d", genderArr[0], genderArr[1], &score, &ans);
				}
                TIME_START(3);
				ret = query(gradeCnt, gradeArr, genderCnt, genderArr, score);
                TIME_END(3);
				if (ans != ret){
					okay = false;
                    dprintf("%d %d %d\n", id, ret, ans);
                }
				break;
			}
			default:
				okay = false;
				break;
		}

	}

	for(auto idx : {0, 1, 2, 3})
		avg[idx] += (double)ms[0] / cnt[idx];

    dprintf("init: %lf\n", (double)ms[0] / cnt[0]);
    dprintf("add: %lf\n", (double)ms[1] / cnt[1]);
    dprintf("remove: %lf\n", (double)ms[2] / cnt[2]);
    dprintf("query: %lf\n", (double)ms[3] / cnt[3]);
	return okay;
}

int main() {
	setbuf(stdout, NULL);
	//freopen("sample_input.txt", "r", stdin);

	int T, MARK;
	scanf("%d %d", &T, &MARK);

	for (int tc = 1; tc <= T; tc++) {
		int score = run() ? MARK : 0;
		printf("#%d %d\n", tc, score);
	}

	dprintf("init: %lf\n",   avg[0] / T);
    dprintf("add: %lf\n",    avg[1] / T);
    dprintf("remove: %lf\n", avg[2] / T);
    dprintf("query: %lf\n",  avg[3] / T);

	return 0;
}