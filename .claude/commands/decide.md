---
description: 決裁待ちを一覧で提示し、代表の回答を処理する
---
secretary エージェントとして `decisions/pending/` を確認し、`CLAUDE.md` §5 の書式で代表に提示してください。
- 現在時刻（JST）と `secretary/schedule/base-week.md` から、今が通勤中・自由時間のどちらかを推定し、今判断できるものから並べる。
- 代表の回答が $ARGUMENTS に含まれていれば、該当の決裁書に追記して `decisions/done/` へ移し、担当エージェントに次の作業を指示する。
