#!/usr/bin/env python3
"""Convert IMA WeChat article content to Markdown files for the blog."""
import json
import re
import os
import sys
from pathlib import Path

# Article metadata extracted from IMA knowledge base
ARTICLES = [
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_0214fccc031486a30651acc75ea200937378449203230071",
        "title": "从考核工具到增长引擎：用"流程-组织-系统"三位一体重构你的KPI",
        "date": "2025-10-16",
        "slug": "kpi-process-organization-system",
        "tags": ["绩效管理", "KPI", "流程管理", "组织能力"],
        "summary": "KPI的本质不是为了"考核"，而是为了"牵引"。本文从控制论出发，探讨如何用流程、组织、系统三位一体的方式重构KPI体系，真正助力企业组织能力提升。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_0c9fdbba2d50f0a4bda25eab92c3a3197378449203230071",
        "title": "风电叶片精益制造专题之一 | 精益生产和行业背景介绍",
        "date": "2018-11-03",
        "slug": "wind-blade-lean-01-background",
        "tags": ["精益管理", "风电叶片", "精益生产", "行业背景"],
        "summary": "风能叶片作为风能发电技术的关键部件，其成本占风电机组的20%-25%。本文从行业背景和精益生产理论两个维度，探讨风电叶片制造面临的挑战与精益化路径。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_b2ef900ba9e539a66ffbe238e23a82397378449203230071",
        "title": "风电叶片精益制造专题之二 | 风能叶片制造流程研究",
        "date": "2018-11-14",
        "slug": "wind-blade-lean-02-process",
        "tags": ["精益管理", "风电叶片", "制造流程", "工艺研究"],
        "summary": "在国外，风能叶片制造已经有超过三十年的发展历史，但在国内，叶片制造在最近十年才刚刚兴起。本文系统介绍和研究风能叶片制造流程。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_2a0ba91630029afad69f9509177bea5f7378449203230071",
        "title": "风电叶片精益制造专题之三 | 精益生产技术应用研究",
        "date": "2018-11-30",
        "slug": "wind-blade-lean-03-application",
        "tags": ["精益管理", "风电叶片", "精益工具", "持续改善"],
        "summary": "结合工艺和制造流程分析，对精益生产的基本理念和方法进行研究，提出风能叶片制造的改进模式。从客户需求出发，彻底消除浪费。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_99fd093ef5ab55b7f9cbf906eb0ac5567378449203230071",
        "title": "风电叶片精益制造专题之四 | 5S实践案例",
        "date": "2018-12-10",
        "slug": "wind-blade-lean-04-5s",
        "tags": ["精益管理", "风电叶片", "5S", "现场改善"],
        "summary": "精益生产小组负责组建由一线员工、领班和生产主管为主体组成的5S委员会，本文分享5S活动在风电叶片制造中的实践案例。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_4781df1b408bc65f458bffb33e902f457378449203230071",
        "title": "风电叶片精益制造专题之五 | 标准化作业实践研究",
        "date": "2018-12-22",
        "slug": "wind-blade-lean-05-standardized-work",
        "tags": ["精益管理", "风电叶片", "标准化作业", "作业指导书"],
        "summary": "标准化作业是风能叶片制造过程的薄弱环节，但也是企业实现精益生产的重要基础。本文对现有作业体系进行重新设计以适应实际生产过程的需要。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_ae63fad089374bfcca951222a82b423d7378449203230071",
        "title": "风电叶片精益制造专题之六 | 价值流图析实践",
        "date": "2019-08-14",
        "slug": "wind-blade-lean-06-vsm",
        "tags": ["精益管理", "风电叶片", "价值流图", "VSM"],
        "summary": "在现场改善开展一段时间后，进一步确定改善机会，收集基础数据，绘制风能叶片制造价值流现状图，对生产过程中的问题进行系统分析。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_9ecc40c6f0074968df2599d55104292e7378449203230071",
        "title": "风电叶片精益制造专题之七 | 持续改善研究",
        "date": "2019-01-29",
        "slug": "wind-blade-lean-07-kaizen",
        "tags": ["精益管理", "风电叶片", "持续改善", "预防性维护"],
        "summary": "基于价值流图析的研究结果，按照初步改善方案，在各个问题工序实施改善，让生产过程流动起来：预防性维护、工艺改进、物流改善和平衡生产线研究。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_fa066d66b46b8b964a60615d1bf574657378449203230071",
        "title": "伟大的背后都是苦难",
        "date": "2019-08-14",
        "slug": "greatness-behind-suffering",
        "tags": ["管理随笔", "成长感悟", "组织文化"],
        "summary": "伟大的背后皆是苦难，成长的背后皆是痛苦。优秀的人和团队，都是在苦难中磨炼出来的。一篇来自制造业一线的管理感悟。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_d282ea0db20d8ac264a5db739d146e2c7378449203230071",
        "title": "一点感悟",
        "date": "2019-05-05",
        "slug": "a-little-reflection",
        "tags": ["管理随笔", "成长感悟", "团队建设"],
        "summary": "和一线员工聊天时的感悟：成长背后皆是痛苦。优秀的人和团队，都是在苦难中磨炼出来的。从制造业一线视角看团队成长。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_a8cec47cff77e6220ee0650d5bb8cb867378449203230071",
        "title": "文化与人性",
        "date": "2023-06-18",
        "slug": "culture-and-humanity",
        "tags": ["管理随笔", "跨文化管理", "组织文化"],
        "summary": "中国和印度都有着悠久的历史文化，社会文化对身在其中的人影响是深刻的。从与印度人共事的经历中，思考文化与人性对管理的影响。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_ccf03015a1ccd6460c4e47bc8f898dda7378449203230071",
        "title": "精益推行过程中的几点反思",
        "date": "2023-07-29",
        "slug": "lean-implementation-reflections",
        "tags": ["精益管理", "持续改善", "管理反思", "精益推行"],
        "summary": "精益思想的核心之一是不断反思并持续改善。如果领导层对精益推行或运营状态已经自满，那他们的行为已经和精益思想背道而驰了。本文分享精益推行中的深度反思。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_1f414b9a82333046222a5e03a09ebeb07378449203230071",
        "title": "没有调查就没有发言权",
        "date": "2023-07-31",
        "slug": "no-investigation-no-right-to-speak",
        "tags": ["管理随笔", "现地现物", "问题解决"],
        "summary": "毛主席说："没有调查，就没有发言权"。这不就是在说"现地现物"很重要吗！要解决问题，首先必须对问题的真实情况有所了解。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_a760975e9e74dcee490a0cc3506a434a7378449203230071",
        "title": "不以解决问题为目的的管理手段都是耍流氓！",
        "date": "2023-08-01",
        "slug": "management-must-solve-problems",
        "tags": ["管理思考", "问题解决", "目标管理"],
        "summary": "管理的目的是解决问题，不以解决问题为目的的管理手段都是耍流氓！问题的本质是目标和现状之间的差距，发现问题就是发现现状和目标之间的差距。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_ab6c2df0de537a1ea94d3bd7119dbb367378449203230071",
        "title": "万事皆项目!",
        "date": "2023-08-13",
        "slug": "everything-is-a-project",
        "tags": ["项目管理", "管理思考", "工作方法"],
        "summary": "华为内部有句话："万事皆项目！"。在制造业工作二十余载，现在想来很多工作都可以用项目管理的思维来思考和操作。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_5280d34f1acae30536d4699a824a1c387378449203230071",
        "title": "作为价值创造最后一环的生产制造",
        "date": "2023-08-20",
        "slug": "manufacturing-as-value-creation",
        "tags": ["精益管理", "价值创造", "班组管理", "一线员工"],
        "summary": "创造价值的最小单元是个体员工。员工的双手能够创造多大的价值取决于意愿和能力的结合。管理的最小颗粒度即为班组。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_bca11b1daa5fcc21ff3ccfab116b96807378449203230071",
        "title": "英雄的时代还是时代的英雄？",
        "date": "2023-09-30",
        "slug": "heroes-of-the-times-or-times-of-heroes",
        "tags": ["管理随笔", "战略思考", "不确定性"],
        "summary": "从0到1领导或参与建设新工厂的感受：越来越感受到不确定性，工作的感觉越来越像在打仗。关于英雄与时代的深度思考。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_787880bc07ac0065050bbdaa02369ede7378449203230071",
        "title": "为什么需要向军队学习？",
        "date": "2023-11-05",
        "slug": "why-learn-from-military",
        "tags": ["管理思考", "组织能力", "华为管理", "不确定性"],
        "summary": "华为为什么能够成功？这和创始人在十几年的军旅生涯不无关系。面对越来越多的不确定性，军队管理在企业中为何有效？",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_e1eecc609012bc210766ce9fe0915d727378449203230071",
        "title": "关于两种组织形态的学习和思考（1）认识问题",
        "date": "2024-02-03",
        "slug": "two-organization-forms-01",
        "tags": ["组织管理", "职能型组织", "流程型组织", "精益管理"],
        "summary": "管理的美妙之处在于：完全不同的管理逻辑很可能都是行得通的，关键在于系统的自洽性。精益制造模式通过"范围经济"构建组织优势，核心指标是Lead Time。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_ef13c2c1c481a2e8be785ed11560fd857378449203230071",
        "title": "关于两种组织形态的学习和思考（2）可能的路径",
        "date": "2024-02-19",
        "slug": "two-organization-forms-02",
        "tags": ["组织管理", "组织转型", "流程型组织", "变革管理"],
        "summary": "从职能型组织向流程型组织的转变是一种范式转移，组织转型该如何进行才更可能成功？从"北京十一学校"转型案例中获得的启示。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_d2e8f6181ededfecd7818ed44294ff797378449203230071",
        "title": "什么是能力？",
        "date": "2024-02-26",
        "slug": "what-is-capability",
        "tags": ["组织能力", "管理思考", "能力建设"],
        "summary": "能力、执行力是大家经常挂在嘴边的词语。但具体到"什么是能力"这个概念，尤其是组织能力，很多时候大家是说不大清楚的。能力是相对于需求的满足而言的。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_5b2379f254bbe50624b3df4a7399a7be7378449203230071",
        "title": "从"制造流水线"到"信息流水线"",
        "date": "2024-09-20",
        "slug": "from-production-line-to-information-line",
        "tags": ["精益管理", "信息化", "价值流", "流程管理"],
        "summary": "价值流图有两个关键元素——信息流和实物流。福特发明了实物流水线，如果我们能找到一种革命性的方法，将信息按流水线方式流动起来，会不会同样造成生产力的革命？",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_c383b0a2c746ad749b2d88f1efd4cab27378449203230071",
        "title": "生与养",
        "date": "2024-10-06",
        "slug": "birth-and-nurture",
        "tags": ["管理随笔", "管理反思", "组织管理"],
        "summary": "工作就好像生养孩子一样，既要负责生，也要负责养。管理上一线和二三线之间的问题很像生孩子和养孩子之间的关系。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_7d11f102f9bb2ab62d8f22eaf80f080f7378449203230071",
        "title": "从流程到运营",
        "date": "2024-12-13",
        "slug": "from-process-to-operations",
        "tags": ["流程管理", "运营管理", "价值创造", "科斯定理"],
        "summary": "企业存在的意义是为客户创造价值。从流程到运营的演进，本质上是企业如何在宏观经济环境中创造剩余价值的过程。基于科斯定理的深度思考。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_1bcd7da664149c386b5f34199f6cefd57378449203230071",
        "title": "消除产品开发中的浪费：排队论的视角",
        "date": "2024-12-18",
        "slug": "eliminate-waste-in-product-development",
        "tags": ["精益管理", "产品开发", "排队论", "浪费消除"],
        "summary": "将产品开发流程视为知识的生产车间，从排队论中获得关于浪费根源的重要见解。理解传统产品开发方法如何增加流程的不稳定性，从而导致大量浪费。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_1d231448b06575d6d1c068872767c93a7378449203230071",
        "title": "从线性思维到系统抓手",
        "date": "2025-05-08",
        "slug": "from-linear-thinking-to-systematic-leverage",
        "tags": ["管理思考", "变革管理", "系统思维", "管理抓手"],
        "summary": "变革管理可能是管理难度最高等级的领域，其难点在于现在的问题很大程度上是由过去的解决方案造成的。从线性思维到系统抓手的深度思考。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_10b1f70526f88339261e8998a10ff7e57378449203230071",
        "title": "什么是自工序完结？",
        "date": "2025-05-15",
        "slug": "what-is-jkk",
        "tags": ["精益管理", "丰田生产方式", "自働化", "自工序完结"],
        "summary": ""自工序完结"起源于丰田佐吉设想的"丰田G型自动纺纱机"，其特征是"纺纱机在织布断线后会自动停止"。这个理念最终演化为TPS的两大支柱之一"自働化"。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_c2f72e4148f1ad69ddf1d3a2cb415e3c7378449203230071",
        "title": "如何确定组织内部"端到端流程负责人"？",
        "date": "2025-07-01",
        "slug": "end-to-end-process-owner",
        "tags": ["流程管理", "组织管理", "端到端流程", "流程负责人"],
        "summary": "当客户提出采购需求时，公司内部第一个响应的角色是谁？从销售到采购的端到端流程中，如何确定流程负责人？从底层逻辑出发的深度分析。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_e462bb7b20c196fe28d30a3702aff39a7378449203230071",
        "title": "绩效指标管理的陷阱：你的企业正在踩哪些管理雷区？",
        "date": "2025-07-12",
        "slug": "performance-metric-traps",
        "tags": ["绩效管理", "KPI", "管理陷阱", "指标设计"],
        "summary": "评价指标过多、抛开关键成功因素思考评价指标、将KPI与薪酬挂钩……本文盘点企业在绩效指标管理中常见的陷阱和雷区。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_4aa47983b0e22c516eab8782d36433967378449203230071",
        "title": "庙堂与人间",
        "date": "2025-08-03",
        "slug": "temple-and-earth",
        "tags": ["管理随笔", "跨文化思考", "印度", "社会观察"],
        "summary": "当飞机在印度机场缓缓降落的那一刻，我的思绪被时光悄然牵引。印度，仿佛依旧是那个熟悉的印度；而中国，早已不是从前的模样。关于观念、文化与社会的深度思考。",
    },
    {
        "media_id": "wechatarticle_e7ab982132f5153aa336e33082894bcf_b23781c2ed09ba0ed9e090117c7f1e307378449203230071",
        "title": "关于绩效管理",
        "date": "2025-08-15",
        "slug": "about-performance-management",
        "tags": ["绩效管理", "KPI", "平衡计分卡", "管理反思"],
        "summary": "摘取管理学专家们关于绩效管理的代表性理论和实践与诸位分享：任何需要花30秒以上时间来描述的评价指标都不适合做绩效评价指标。",
    },
]


def clean_ima_content(raw_content: str) -> str:
    """Convert IMA XML/HTML content to clean Markdown."""
    text = raw_content

    # Remove XML declaration
    text = re.sub(r'<\?xml[^>]*\?>', '', text)
    # Remove body tags
    text = re.sub(r'</?body>', '', text)
    # Remove image tags (keep alt text if meaningful)
    text = re.sub(r'<image[^>]*alt="([^"]*)"[^>]*/?>', r'\1', text)
    text = re.sub(r'<img[^>]*alt="([^"]*)"[^>]*/?>', r'\1', text)
    text = re.sub(r'<image[^>]*/?>', '', text)
    text = re.sub(r'<img[^>]*/?>', '', text)
    # Convert h tags to markdown headers
    text = re.sub(r'<h[^>]*>([^<]+)</h[^>]*>', r'## \1', text)
    # Convert p tags - just extract content
    text = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n\n', text, flags=re.DOTALL)
    # Convert li tags
    text = re.sub(r'<li[^>]*>(.*?)</li>', r'- \1\n', text, flags=re.DOTALL)
    # Remove ul/ol tags
    text = re.sub(r'</?[uo]l[^>]*>', '', text)
    # Remove section tags
    text = re.sub(r'</?section[^>]*>', '', text)
    # Remove all remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Decode HTML entities
    text = text.replace('&amp;', '&')
    text = text.replace('&lt;', '<')
    text = text.replace('&gt;', '>')
    text = text.replace('&quot;', '"')
    text = text.replace('&#39;', "'")
    text = text.replace('&nbsp;', ' ')
    text = text.replace('&#x', '')
    # Remove empty lines (more than 2 consecutive)
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Clean up whitespace
    text = text.strip()

    return text


def create_frontmatter(article: dict) -> str:
    """Create YAML frontmatter for an article."""
    tags_str = ', '.join(f'"{t}"' for t in article['tags'])
    return f"""---
title: "{article['title']}"
summary: "{article['summary']}"
date: "{article['date']}"
tags: [{tags_str}]
description: "{article['summary']}"
keywords: {json.dumps(article['tags'], ensure_ascii=False)}
slug: "{article['slug']}"
---"""


def process_article(article: dict, raw_content: str, output_dir: str):
    """Process a single article and write to file."""
    clean_content = clean_ima_content(raw_content)
    frontmatter = create_frontmatter(article)
    full_content = f"{frontmatter}\n\n# {article['title']}\n\n{clean_content}\n"

    # Remove duplicate title if content starts with it
    title_pattern = f"# {article['title']}"
    if clean_content.startswith(article['title']):
        clean_content = clean_content[len(article['title']):].lstrip()

    full_content = f"{frontmatter}\n\n# {article['title']}\n\n{clean_content}\n"

    output_path = os.path.join(output_dir, f"{article['slug']}.md")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_content)

    return output_path


def main():
    output_dir = sys.argv[1] if len(sys.argv) > 1 else '/Users/yejianxing/WorkBuddy/2026-06-20-22-36-38/blog-app/content/articles'
    content_dir = sys.argv[2] if len(sys.argv) > 2 else '/tmp/ima_articles'

    os.makedirs(output_dir, exist_ok=True)

    processed = 0
    skipped = 0

    for article in ARTICLES:
        content_file = os.path.join(content_dir, f"{article['media_id']}.txt")
        if os.path.exists(content_file):
            with open(content_file, 'r', encoding='utf-8') as f:
                raw_content = f.read()
            path = process_article(article, raw_content, output_dir)
            processed += 1
            print(f"✅ Processed: {article['title']} -> {path}")
        else:
            skipped += 1
            print(f"⏭️  Skipped (no content file): {article['title']}")

    print(f"\nTotal: {processed} processed, {skipped} skipped")


if __name__ == '__main__':
    main()
