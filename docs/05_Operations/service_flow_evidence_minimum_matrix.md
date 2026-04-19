# Shared Appendix: Service Flow Evidence Minimum Matrix
*Dự án: NowWash*

Tài liệu này gom `evidence minimum set` của toàn bộ `Service Flow` vào một bảng dùng chung để:
- audit tra nhanh
- complaint/incident flow tái dùng ngay
- sign-off không phải đọc rải rác từng stage

Nguyên tắc:
- `Core evidence` là hard blocker: thiếu thì không nên coi stage là complete sạch.
- `Conditional evidence` chỉ bắt buộc khi đúng loại case đó xảy ra.
- Matrix này không thay thế deep-dive stage docs; nó là bản tổng hợp để vận hành và kiểm soát dùng nhanh.

## 1. Evidence Matrix Theo Stage

| Stage | Core evidence tối thiểu | Conditional evidence | Ghi chú vận hành |
| --- | --- | --- | --- |
| `SF-00` | order creation log, customer/address snapshot, cluster, slot, plan | duplicate-review note, manual eligibility override note | Thiếu snapshot đầu vào sẽ yếu khi truy vết case eligibility |
| `SF-01` | wave ID, route manifest sạch, shipper assignment, bag/seal stock check, device readiness check, release owner | reassign handover note, building access special note, fallback approval note | Route không nên release nếu thiếu checklist readiness |
| `SF-02` | order scan, bag scan, seal scan, seal close-up photo, location photo, timestamp, shipper account | reception/locker proof, customer authorization source, exception reason code, CS approval note | Đây là `minimum legal-operational proof` của pickup |
| `SF-03` | pickup completion ref, route/node assignment, handover log từng node, seal visual status tại node nhận, timestamp đến node, from-owner/to-owner | ảnh bag/seal nếu visual fail, reroute approval note, delay reason code, camera hub nếu incident | Transit phải luôn truy được owner chain |
| `SF-04` | order scan/intake result, mapping check result, seal check result, received_by, received_at | fail photo, quarantine note, wrong-workshop note, incident trigger note | Không intake sạch nếu seal/mapping evidence còn mờ |
| `SF-05` | camera continuity, seal shown before cut, full table-emptying sequence, table clear verification | ORG photo, found item log, late BLK/OSZ note, station hold note | Đây là evidence station mạnh nhất bên trong xưởng |
| `SF-06` | order_id, machine_id, program_id, started_at, ended_at, started_by, ended_by, interruption count/reason, handoff_to_qc_owner | utility outage note, machine fault log, reassignment approval note | Nếu execution log yếu sẽ khó bảo vệ case damage/rework |
| `SF-07` | qc outcome, qc reason code nếu không pass sạch, rewash_count, qc_owner, qc_completed_at | damage photo, ORG reference, lead review note, incident note | Repeat fail và Q2 phải luôn truy được lý do |
| `SF-08` | pack_owner, packed_at, final barcode, label_scan_result, staging_location_code, rtd_outcome | package photo nếu exception, relabel note, substitute material note, priority/dispatch note | RTD chỉ thật khi locate được package |
| `SF-09` | OFD timestamp, delivery owner, delivery mode, attempt result | direct handover proof, 2 ảnh alternate point, customer message/note, failed-attempt note, return-to-node log | Delivery proof phải khớp delivery mode |
| `SF-10` | terminal outcome, event chain status, evidence refs của control points, closure owner, closure note | remediation log, incident resolution note, review tag reason, payment reconciliation ref | Close sạch chỉ hợp lệ khi hồ sơ tự bảo vệ được |

## 2. Hard-Blocker Evidence Theo Bucket

| Bucket | Hard blocker evidence |
| --- | --- |
| `Custody` | scan/linkage order-bag-seal, seal status, handover owner chain |
| `Execution` | machine/program/timestamps/interruption log |
| `Quality` | QC outcome + reason + ORG/damage reference khi applicable |
| `Delivery` | delivery mode proof, failed-attempt reason, return owner/node |
| `Closure` | path-specific event chain + control-point evidence refs |

## 3. Kết Luận

Nếu dùng matrix này cùng các deep-dive docs:
- frontline biết thiếu gì thì chưa được complete
- QA biết audit theo stage nào
- complaint flow có thể kéo evidence nhanh mà không cần đọc lại toàn bộ flow
