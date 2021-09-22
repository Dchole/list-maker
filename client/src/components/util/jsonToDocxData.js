import {
  Document,
  Table,
  TableRow,
  TableCell,
  Paragraph,
  VerticalAlign,
  HeadingLevel
} from "docx"
import { jsonData } from "./jsonData"

export default list => {
  const json = jsonData(list)

  const table = new Table({
    rows: [
      new TableRow({
        children: Object.keys(json[0]).map(
          key =>
            new TableCell({
              children: [
                new Paragraph({
                  text: key,
                  heading: HeadingLevel.HEADING_3
                })
              ],
              verticalAlign: VerticalAlign.CENTER
            })
        )
      }),
      ...json.map(
        data =>
          new TableRow({
            children: Object.values(data).map(
              value =>
                new TableCell({
                  children: [
                    new Paragraph({
                      text: String(value)
                    })
                  ],
                  verticalAlign: VerticalAlign.CENTER
                })
            )
          })
      )
    ]
  })

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: list.title,
            heading: HeadingLevel.HEADING_1
          }),
          table
        ]
      }
    ]
  })

  return doc
}
