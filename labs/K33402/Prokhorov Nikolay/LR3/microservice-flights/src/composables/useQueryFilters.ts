import { FindOptions, Includeable } from 'sequelize/types/model'
import { ModelType } from 'sequelize-typescript'
import { Request } from 'express'

type TParamsWhere = {
    qKey: string
    model?: ModelType<any, any>
    prop: string
    cmp: PropertyKey
}

type Tparams = {
    include?: ModelType<any, any>[]
    where?: TParamsWhere[]
}

export default function useQueryFilters(request: Request, params?: Tparams) {
    if (!params) return

    const options: Omit<FindOptions<any>, 'include' | 'where'> & {
        include: Includeable[]
        where?: Record<string, any>
    } = { include: [] }

    let whereTopLevel: TParamsWhere[] | null = null
    let whereInclude: TParamsWhere[] | null = null

    if (params.where) {
        whereTopLevel = params.where.filter((whereOption) => !whereOption.model)
        whereInclude = params.where.filter((whereOption) => whereOption.model)
    }

    if (params.include) {
        params.include.forEach((model) => {
            const includeableOption = {
                model,
                where: undefined as unknown as Record<PropertyKey, any>,
            }

            const modelWhereOptions = whereInclude?.filter(
                (whereOption) => whereOption.model === model
            )
            if (modelWhereOptions && modelWhereOptions.length !== 0) {
                modelWhereOptions.forEach((whereOption) => {
                    if (request.query[whereOption.qKey]) {
                        if (!includeableOption.where)
                            includeableOption.where = {}

                        if (!includeableOption.where[whereOption.prop])
                            includeableOption.where[whereOption.prop] = {}

                        includeableOption.where[whereOption.prop][
                            whereOption.cmp
                        ] = request.query[whereOption.qKey]
                    }
                })
            }

            options.include.push(includeableOption)
        })
    }

    if (whereTopLevel) {
        whereTopLevel.forEach((whereOption) => {
            if (request.query[whereOption.qKey]) {
                if (!options.where) options.where = {}
                if (!options.where[whereOption.prop])
                    options.where[whereOption.prop] = {}

                options.where[whereOption.prop][whereOption.cmp] =
                    request.query[whereOption.qKey]
            }
        })
    }

    return options
}
