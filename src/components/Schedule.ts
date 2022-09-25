import { html, TemplateResult } from 'lit-html'

import { convertMinutesToTime, convertTimeToString } from '../utils/convertTime'

const Schedule = (scheduleData: ScheduleClassesObject): TemplateResult => {
  return (html`
		<div class="scheduleContainer">
			<table class="columnHeader scheduleTable">
			
				<tr>
					<th class="tableHeader columnHeader timeHeader">
						Time
					</th>
					<th class="tableHeader columnHeader weekdayHeader">
						Segunda
					</th>
					<th class="tableHeader columnHeader weekdayHeader">
						Terça
					</th>
					<th class="tableHeader columnHeader weekdayHeader">
						Quarta
					</th>
					<th class="tableHeader columnHeader weekdayHeader">
						Quinta
					</th>
					<th class="tableHeader columnHeader weekdayHeader">
						Sexta
					</th>
				</tr>

				${Object.keys(scheduleData).map(startTime => ScheduleRow(+startTime, scheduleData[+startTime]))}

			</table>
		</div>
	`)
}

const ScheduleRow = (startTime: number, scheduleRowData: ScheduleRowClassesObject): TemplateResult => (html`
	<tr class="classesRows">

		<td class="tableHeader rowHeader">
			${convertTimeToString(convertMinutesToTime(startTime))}
		</td>

		${scheduleRowData.map(classes => {
			return html`
				<td class="classCell">
					<div class="classContainer">
						${classes.reduce((classesNames, currentClass) => (classesNames += currentClass.subject + ', '), '')}
					</div>
				</td>
			`
		})}

	</tr>
`)

export default Schedule
