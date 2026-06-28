---
title: "流程挖掘（Process Mining）在制造业的落地指南"
summary: "流程挖掘技术可以从 IT 系统日志中自动还原真实业务流程，发现隐藏的瓶颈和偏差。本文系统讲解 Process Mining 的原理、工具选型和制造业落地路径。"
date: "2026-06-25"
tags: ["流程挖掘", "Process Mining", "流程管理", "数字化转型"]
description: "从原理到实践，完整讲解流程挖掘技术在制造业的应用：事件日志要求、算法原理、工具选型、落地案例和常见陷阱。"
keywords: ["流程挖掘", "Process Mining", "流程管理", "Celonis", "事件日志", "流程可视化", "数字化转型"]
slug: "process-mining-manufacturing"
---

# 流程挖掘（Process Mining）在制造业的落地指南

每个工厂都有两套流程：**写在文件里的流程**（SOP、流程图）和**实际执行的流程**。两者之间的差距，往往就是效率流失和风险隐藏的地方。

**流程挖掘（Process Mining）是一把"照妖镜"，让实际执行的流程无所遁形。** 它从 IT 系统的事件日志中自动还原真实流程，告诉你流程实际怎么走、在哪里卡住、谁在偏离标准。

---

## 一、什么是流程挖掘？

### 定义

流程挖掘是一类从信息系统事件日志中提取知识的数据分析技术，目的是发现、监控和改进真实流程。

### 核心三要素

流程挖掘的输入是**事件日志**，每条事件记录必须包含三个核心字段：

| 字段 | 说明 | 示例 |
|------|------|------|
| Case ID | 流程实例标识 | 工单号 WO-2026-001 |
| Activity | 活动名称 | "创建工单" |
| Timestamp | 时间戳 | 2026-06-20 08:30:00 |

可选但重要的字段：
- Resource（执行者）：操作员/设备/系统
- Cost（成本）：活动成本
- Variant（变体）：流程路径分类

### 事件日志示例

```
Case ID      Activity           Timestamp              Resource
WO-001       创建工单            2026-06-20 08:00       系统自动
WO-001       物料分配            2026-06-20 08:15       仓库管理员
WO-001       首检                2026-06-20 09:30       质检员A
WO-001       生产加工            2026-06-20 10:00       产线1
WO-001       终检                2026-06-20 14:00       质检员B
WO-001       入库                2026-06-20 15:30       仓库管理员
WO-002       创建工单            2026-06-20 08:05       系统自动
WO-002       物料分配            2026-06-20 08:30       仓库管理员
WO-002       首检                2026-06-20 09:45       质检员A
WO-002       返工申请            2026-06-20 10:15       质检员A    ← 异常！
WO-002       返工                2026-06-20 11:00       产线2
WO-002       终检                2026-06-20 15:30       质检员B
WO-002       入库                2026-06-20 17:00       仓库管理员
```

---

## 二、流程挖掘的三大能力

### 1. 流程发现（Discovery）

从事件日志中自动生成流程图，无需人工绘制：

```python
# 使用 pm4py 进行流程发现
import pm4py

# 加载事件日志
event_log = pm4py.read_xes('production_log.xes')

# 自动发现流程模型（使用 Alpha Miner 算法）
net, initial_marking, final_marking = pm4py.discover_petri_net_alpha(event_log)

# 可视化流程
pm4py.view_petri_net(net, initial_marking, final_marking)

# 也可以用更现代的算法
process_tree = pm4py.discover_process_tree_inductive(event_log)
bpmn_graph = pm4py.convert_to_bpmn(process_tree)
pm4py.view_bpmn(bpmn_graph)
```

**价值**：你看到的不是"流程文件里的理想流程"，而是"系统记录的真实流程"。通常你会发现两者差别很大。

### 2. 一致性检查（Conformance Checking）

将实际流程与标准流程对比，发现偏差：

```python
# 将实际日志与标准流程模型对比
conformance_result = pm4py.conformance_diagnostics_token_based_replay(
    event_log, net, initial_marking, final_marking
)

# 分析偏差
for i, case_result in enumerate(conformance_result):
    if case_result['trace_fitness'] < 1.0:
        print(f"Case {i}: 适应度 = {case_result['trace_fitness']:.2%}")
        print(f"  缺失活动: {case_result['missing_tokens']}")
        print(f"  多余活动: {case_result['consumed_tokens']}")
```

**典型发现：**
- 工序跳过：某些工单跳过了"首检"直接进入加工
- 返工回路：某些产品在"终检→返工→终检"之间反复循环
- 超时等待：工序间等待时间远超标准
- 非标准路径：出现了标准流程中没有的活动

### 3. 流程增强（Enhancement）

在流程图上叠加性能指标，实现流程可视化分析：

```python
# 性能分析：各工序的平均耗时
performance_df = pm4py.get_cycle_time(event_log)
print(f"整体平均周期时间: {performance_df} 秒")

# 变体分析：识别最常见的流程路径
variants = pm4py.get_variants(event_log)
for variant, count in sorted(variants.items(), key=lambda x: -len(x[1]))[:5]:
    print(f"路径变体: {variant} → 出现 {len(count)} 次")
```

---

## 三、制造业中的典型应用场景

### 场景一：生产工单流程分析

**问题**：工厂有数百个工单，每个工单从创建到入库的路径各不相同，管理层想知道"真实的生产流程长什么样"。

**流程挖掘方案**：

1. 从 MES 提取工单事件日志
2. 自动生成流程图，展示所有可能的路径
3. 识别最频繁路径（Happy Path）和异常路径
4. 计算各路径的平均周期时间

**典型发现**：
- 80% 的工单走标准路径，平均周期 8 小时
- 15% 的工单经历返工，平均周期 16 小时
- 5% 的工单卡在物料等待，平均周期 36 小时

### 场景二：采购到付款（P2P）流程优化

**问题**：采购到付款流程跨 ERP 和 OA 系统，流程不透明，审批环节多。

**流程挖掘方案**：

```
采购申请 → 审批 → 下单 → 收货 → 质检 → 入库 → 付款
```

| 分析维度 | 发现 | 优化建议 |
|---------|------|---------|
| 路径变体 | 127 种不同路径 | 标准化审批流程 |
| 等待时间 | 审批环节平均等待 3.2 天 | 设置审批 SLA |
| 返工率 | 12% 的采购单被退回修改 | 完善采购申请模板 |
| 瓶颈 | 质检环节堆积严重 | 增加质检资源或并行处理 |

### 场景三：设备维修流程合规性检查

**问题**：设备维修流程规定了"报修→评估→审批→执行→验证"的标准路径，但实际执行中经常跳过"评估"或"验证"环节。

**流程挖掘方案**：

```python
# 一致性检查：实际维修记录 vs 标准维修流程
standard_model = pm4py.read_petri_net('standard_maintenance.pnml')

conformance = pm4py.conformance_diagnostics_alignments(
    maintenance_log, standard_model[0], standard_model[1], standard_model[2]
)

# 统计合规率
compliant_count = sum(1 for c in conformance if c['fitness'] == 1.0)
total_count = len(conformance)
compliance_rate = compliant_count / total_count

print(f"维修流程合规率: {compliance_rate:.1%}")
print(f"不合规工单数: {total_count - compliant_count}")
```

---

## 四、工具选型

### 主流流程挖掘工具对比

| 工具 | 类型 | 优势 | 劣势 | 适用场景 |
|------|------|------|------|---------|
| Celonis | 商业 SaaS | 功能最全，生态最好 | 价格高 | 大型企业 |
| Signavio (SAP) | 商业 SaaS | 与 SAP 集成好 | 依赖 SAP 生态 | SAP 用户 |
| Disco (Fluxicon) | 商业桌面 | 易用性好 | 功能相对简单 | 中小企业入门 |
| pm4py | 开源 Python | 免费，可编程 | 需要编程能力 | 技术团队 |
| Apromore | 开源/商业 | 功能全面 | 社区较小 | 学术/研究 |

### 选型建议

**预算充足 + 非技术团队**：Celonis（行业标杆）
**SAP 环境**：Signavio（原生集成）
**预算有限 + 有 Python 团队**：pm4py（开源自建）
**快速验证**：Disco（14天试用，简单上手）

---

## 五、数据准备：最容易踩坑的环节

流程挖掘的成功，80% 取决于数据准备质量。

### 常见数据问题

**1. 时间戳缺失或不准确**

```python
# 问题：某些活动的结束时间缺失
# 解决：根据下一活动的开始时间推断
def fill_missing_endtime(log):
    log = log.sort_values(['Case ID', 'Timestamp'])
    log['End Time'] = log.groupby('Case ID')['Timestamp'].shift(-1)
    return log
```

**2. 活动名称不统一**

同一个活动在不同系统中名称不同（"首检" / "First Inspection" / "FI"），需要标准化映射。

**3. 时区不一致**

跨工厂/跨系统的日志可能存在时区差异，需要统一为同一时区。

**4. 事件缺失**

某些活动在线下执行，系统未记录。需要在流程挖掘时考虑"隐形活动"。

### 数据提取模板

```sql
-- 从 MES 提取生产工单事件日志
SELECT 
    work_order_id AS case_id,
    activity_name AS activity,
    activity_timestamp AS timestamp,
    operator_name AS resource,
    work_center AS department
FROM mes_activity_log
WHERE work_order_id IN (
    SELECT work_order_id 
    FROM mes_work_orders 
    WHERE create_date >= '2026-01-01'
)
ORDER BY work_order_id, activity_timestamp;
```

---

## 六、从发现到改进：流程挖掘的价值闭环

流程挖掘不是一次性分析，而是一个持续改进的闭环：

```
    ┌──────────┐
    │  发现    │ ← 自动生成流程图，识别路径变体
    └────┬─────┘
         ▼
    ┌──────────┐
    │  诊断    │ ← 一致性检查，发现偏差和瓶颈
    └────┬─────┘
         ▼
    ┌──────────┐
    │  改进    │ ← 优化流程路径，消除返工和等待
    └────┬─────┘
         ▼
    ┌──────────┐
    │  监控    │ ← 持续监控流程KPI，发现新偏差
    └────┬─────┘
         │
         ▼
    ┌──────────┐
    │  再发现  │ ← 流程变化后重新挖掘
    └──────────┘
```

### 关键 KPI 监控

| KPI | 定义 | 目标 |
|-----|------|------|
| 流程周期时间 | 从开始到结束的总时间 | 持续缩短 |
| 路径合规率 | 走标准路径的工单比例 | > 90% |
| 返工率 | 经历返工的工单比例 | < 5% |
| 等待时间占比 | 等待时间 / 总周期时间 | < 30% |
| 自动化率 | 无人工干预的工序比例 | 持续提升 |

---

## 行动清单：90 天流程挖掘落地计划

### 第 1-30 天：数据准备 + 初步发现

- [ ] 选择一个流程作为试点（建议：生产工单流程）
- [ ] 从 MES/ERP 提取 3-6 个月的事件日志
- [ ] 清洗数据（统一活动名称、补全时间戳、处理缺失值）
- [ ] 使用工具自动生成流程图
- [ ] 与业务部门确认流程图的准确性

### 第 31-60 天：深入分析 + 诊断

- [ ] 进行一致性检查，识别偏差
- [ ] 分析路径变体，计算各路径的周期时间和占比
- [ ] 识别 Top 3 瓶颈环节
- [ ] 量化偏差和瓶颈的成本影响
- [ ] 与流程Owner共同制定改进方案

### 第 61-90 天：改进实施 + 监控

- [ ] 实施流程改进（标准化路径、消除返工、优化瓶颈）
- [ ] 建立流程 KPI 监控看板
- [ ] 设置偏差告警阈值
- [ ] 培训流程Owner使用流程挖掘工具
- [ ] 规划下一个流程挖掘项目

---

## 常见陷阱与避坑

### 1. "垃圾进，垃圾出"

**陷阱**：数据质量差导致流程图杂乱无章，无法解读。

**对策**：先花 50% 的时间在数据清洗上，不要急于生成流程图。

### 2. 追求"完美流程"

**陷阱**：试图消除所有路径变体，强制所有工单走同一路径。

**对策**：区分"合理变体"（如紧急订单走加急路径）和"不合理偏差"（如跳过质检）。只消除后者。

### 3. 只分析不行动

**陷阱**：生成漂亮的流程图和报告，但没有推动实际改进。

**对策**：每个流程挖掘项目必须有明确的改进目标和Owner，以 KPI 改善作为验收标准。

### 4. 忽视组织变革

**陷阱**：流程改进方案被一线员工抵触，无法落地。

**对策**：在分析阶段就邀请一线员工参与，让他们看到数据、理解问题，成为改进的推动者而非被改造对象。

---

## 结语

流程挖掘是制造业数字化转型中被严重低估的技术。它不需要传感器、不需要 AI 模型、不需要大量投资——**你只需要从现有 IT 系统中提取事件日志，就能看到真实流程的全貌。**

如果你不知道从哪里开始数字化，流程挖掘是最好的起点。因为它会告诉你：问题在哪里，机会在哪里，优先级是什么。

**先看见流程，才能改善流程。**

---

*本文是「流程管理系列」的第五篇。后续我们将深入 RPA + AI 在制造业的应用、BPMS 选型等专题。*
