#include <map>
#include <cstring>
#include <stdio.h>
#include <algorithm>
#include <iostream>

using namespace std;

#define MAX_SCORE 300000
#define MIN_SCORE 0
#define MAX_ID 1000000000
#define MIN_ID 1

typedef struct student
{
    int mId;
    char mGrade;
    char binaryGender; // 0 for male, 1 for female
    int mScore;
} student;

map<int, student> table;
multimap<int, int, less<int>> male_1_grade_id_index;
multimap<int, int, less<int>> female_1_grade_id_index;

multimap<int, int, less<int>> male_2_grade_id_index;
multimap<int, int, less<int>> female_2_grade_id_index;

multimap<int, int, less<int>> male_3_grade_id_index;
multimap<int, int, less<int>> female_3_grade_id_index;

multimap<int, int> *idx[2][3] = {{&male_1_grade_id_index, &male_2_grade_id_index, &male_3_grade_id_index},
                                 {&female_1_grade_id_index, &female_2_grade_id_index, &female_3_grade_id_index}};

void init()
{
    table.clear();

    male_1_grade_id_index.clear();
    female_1_grade_id_index.clear();
    male_2_grade_id_index.clear();
    female_2_grade_id_index.clear();
    male_3_grade_id_index.clear();
    female_3_grade_id_index.clear();
    return;
}

int add(int mId, int mGrade, char mGender[7], int mScore)
{
    student temp;
    multimap<int, int> *target_index;

    temp.mId = mId;
    temp.mGrade = mGrade;
    if (strcmp("male", mGender))
    {
        temp.binaryGender = 0;
    }
    else
    {
        temp.binaryGender = 1;
    }
    temp.mScore = mScore;

    table.insert(pair<int, student>(mId, temp));
    target_index = idx[temp.binaryGender][temp.mGrade - 1];

    target_index->insert(pair<int, int>(mScore, mId));

    pair<multimap<int, int>::iterator, multimap<int, int>::iterator> ret;
    ret = target_index->equal_range(target_index->rbegin()->first);

    int max_id = target_index->rbegin()->second;

    for (multimap<int, int>::iterator it = ret.first; it != ret.second; ++it)
    {
        if (max_id < it->second)
        {
            max_id = it->second;
        }
    }

    return max_id;
}

int remove(int mId)
{
    map<int, student>::iterator it;
    multimap<int, int> *target_index;

    it = table.find(mId);

    if (it != table.end())
    {
        int mGrade = it->second.mGrade;
        int binaryGender = it->second.binaryGender;
        int mId = it->second.mId;

        target_index = idx[binaryGender][mGrade - 1];

        table.erase(it);

        for (multimap<int, int>::iterator it = target_index->begin(); it != target_index->end(); it++)
        {
            if (it->second == mId)
            {
                target_index->erase(it);
                break;
            }
        }

        pair<multimap<int, int>::iterator, multimap<int, int>::iterator> ret;
        ret = target_index->equal_range(target_index->begin()->first);

        if (ret.first == target_index->end())
        { // no key
            return 0;
        }

        int min_id = MAX_ID + 1;

        for (multimap<int, int>::iterator it = ret.first; it != ret.second; ++it)
        {
            if (min_id > it->second)
            {
                min_id = it->second;
            }
        }

        return min_id;
    }
    else
    {
        return 0;
    }
}

int query(int mGradeCnt, int mGrade[], int mGenderCnt, char mGender[][7], int mScore)
{
    multimap<int, int> *target_index;
    multimap<int, int>::iterator it;
    int binaryGender = -1;
    int iter = 0;

    int min_id = MAX_ID + 1;
    int min_score = MAX_SCORE + 1;

    for (int i = 0; i < mGradeCnt; ++i)
    {
        for (int j = 0; j < mGenderCnt; ++j)
        {
            if (strcmp("male", mGender[j]))
            {
                binaryGender = 0;
            }
            else
            {
                binaryGender = 1;
            }
            target_index = idx[binaryGender][mGrade[i] - 1];

            it = target_index->lower_bound(mScore);

            if (it == target_index->end())
            { // no key
                continue;
            }

            for (; it != target_index->end(); ++it)
            {
                if (it->first < min_score)
                {
                    min_score = it->first;
                    min_id = it->second;
                }
                else if (it->first == min_score)
                {
                    min_id = it->second < min_id ? it->second : min_id;
                }
                else
                {
                    break;
                }
            }
        }
    }

    if (min_id == MAX_ID + 1)
    {
        return 0;
    }
    else
    {
        return min_id;
    }
}