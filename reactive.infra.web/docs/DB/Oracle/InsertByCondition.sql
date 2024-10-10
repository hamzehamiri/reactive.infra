INSERT INTO REQUEST_RESERVE
(ID,
 request_date,
 chassis_no,
 plate_no,
 time_box,
 entering_time,
 status,
 id_request,
 insert_user,
 service,
 center)
SELECT 5,
       r.TIME_BOX,
	   '1',
	   '2',
	   r.TIME_BOX,
	   SYSDATE,
	   '0',
	   25882,
	   null,
	   32584,
	   1
FROM REQUEST_RESERVE r
where r.TIME_BOX = to_date('2024-04-25 10:00:00', 'YYYY-MM-DD HH24:MI:SS')
and CENTER = 41018
group by r.TIME_BOX,r.CENTER having count(r.id) < 2/*(select capacity from RSV_TIME_BOX dd where dd.ID= 70871)*/


select r.TIME_BOX
from REQUEST_RESERVE r
where r.TIME_BOX = to_date('2024-04-25 10:00:00', 'YYYY-MM-DD HH24:MI:SS')
group by r.TIME_BOX, r.CENTER
having count(r.id) < 2